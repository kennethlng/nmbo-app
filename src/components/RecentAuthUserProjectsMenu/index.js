import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'; 
import { UserProject } from '../../models/UserProject'; 
import * as DB from '../../constants/db'; 
import * as ROUTES from '../../constants/routes';
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName';
import * as CONTENT_ID from '../../constants/contentId';
import * as CONTENT_TYPE from '../../constants/contentType';
import { db, firebase } from '../../lib/firebase';
import { useRouter } from 'next/router'

export default function RecentAuthUserProjectsMenu() {
    const authUser = useContext(AuthUserContext); 
    const router = useRouter();
    const [userProjects, setUserProjects] = useState([]); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        // Fetch data
        list(); 

        // Log Google Analytics event for viewing item list
        firebase.analytics().logEvent('view_item_list', {
            item_list_id: LIST_ID.RECENT_USER_PROJECTS,
            item_list_name: LIST_NAME.RECENT_USER_PROJECTS
        })
    }, [])

    const list = () => {
        setLoading(true); 

        db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS)
        .orderBy(DB.OPENED_ON, "desc")
        .limit(10)
        .get()
        .then(function(querySnapshot) {
            var items = []; 
            querySnapshot.forEach(function(doc) {
                let item = new UserProject(doc); 
                items.push(item); 
            })
            setUserProjects(items); 

            setLoading(false); 
        }) 
        .catch(function(error) {
            console.log("Error listing current user's created projects: ", error); 
            setLoading(false); 
        })
    }
    
    const handleRowClick = (userProject) => {
        // Log Google Analytics event for selecting item
        firebase.analytics().logEvent('select_item', {
            items: [{
                item_id: userProject[DB.ID],
                item_name: userProject[DB.TITLE],
                item_list_name: LIST_NAME.RECENT_USER_PROJECTS,
                item_list_id: LIST_ID.RECENT_USER_PROJECTS
            }],
            item_list_name: LIST_NAME.RECENT_USER_PROJECTS,
            item_list_id: LIST_ID.RECENT_USER_PROJECTS
        })

        // Route to project page
        router.push(ROUTES.PROJECT(userProject[DB.ID]))
    }

    const handleSeeAllChecklistsClick = () => {
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HOME_PAGE_VIEW_PROJECTS_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route to Checklists page
        router.push(ROUTES.PROJECTS)
    }

    return (
        loading ? <progress className="progress is-small" max="100">15%</progress> : (
            userProjects.length > 0 ? (
                <aside className="menu">
                    <p className="menu-label">
                        Recent
                    </p>
                    <ul className="menu-list">
                        {userProjects.map(userProject => (
                            <li key={userProject[DB.ID]}>
                                <a onClick={() => handleRowClick(userProject)}>
                                    <p className="is-size-5">
                                        {userProject[DB.TITLE]}
                                    </p>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <hr/>
                    <a onClick={handleSeeAllChecklistsClick}>
                        <span className="is-size-5">
                            See all my checklists
                        </span>
                        <span className="icon is-medium">
                            <i className="fas fa-arrow-right"></i>
                        </span>
                    </a>
                </aside>
            ) : null 
        )
    )
}