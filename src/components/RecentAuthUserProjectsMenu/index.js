import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'; 
import { UserProject } from '../../models/UserProject'; 
import * as DB from '../../constants/db'; 
import * as ROUTES from '../../constants/routes';
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName';
import { db, firebase } from '../../lib/firebase';
import { useRouter } from 'next/router'
import PlaceholderNotification from './PlaceholderNotification'

export default function RecentAuthUserProjectsMenu() {
    const authUser = useContext(AuthUserContext); 
    const router = useRouter();
    const [userProjects, setUserProjects] = useState([]); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        if (authUser) {
            // Fetch data
            list(); 

            // Log Google Analytics event for viewing item list
            firebase.analytics().logEvent('view_item_list', {
                item_list_id: LIST_ID.RECENT_USER_PROJECTS,
                item_list_name: LIST_NAME.RECENT_USER_PROJECTS
            })
        }
    }, [authUser])

    const list = () => {
        setLoading(true); 

        // Set last week date as start date
        var startDate = Date.now() - 604800000;
        var startDateObj = new Date(startDate);

        // Fetch all user_projects that were updated within the last week
        db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS)
        .where(DB.UPDATED_ON, '>=', startDateObj)
        .orderBy(DB.UPDATED_ON, "desc")
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

    return (
        loading ? <progress className="progress is-small" max="100">15%</progress> : (
            <aside className="menu">
                <p className="menu-label">
                    Recent
                </p>
                {userProjects.length > 0 ? (
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
                ) : <PlaceholderNotification/>}
            </aside>
        )
    )
}