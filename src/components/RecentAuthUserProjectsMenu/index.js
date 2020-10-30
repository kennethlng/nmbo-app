import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'; 
import UserProjectsMenuList from '../UserProjectsMenuList'; 
import { UserProject } from '../../models/UserProject'; 
import * as DB from '../../constants/db'; 
import * as ROUTES from '../../constants/routes';
import { db } from '../../lib/firebase';
import { useRouter } from 'next/router'

export default function RecentAuthUserProjectsMenu() {
    const authUser = useContext(AuthUserContext); 
    const router = useRouter();
    const [userProjects, setUserProjects] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const limit = 10; 

    useEffect(() => {
        list(); 
    }, [])

    const list = () => {
        setLoading(true); 

        db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS)
        .orderBy(DB.OPENED_ON, "desc")
        .limit(limit)
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

    return (
        loading ? <progress className="progress is-small" max="100">15%</progress> : (
            userProjects.length > 0 ? (
                <aside className="menu">
                    <p className="menu-label">
                        Recent
                    </p>
                    <UserProjectsMenuList
                        userProjects={userProjects}
                    />
                    {userProjects.length >= limit ? (
                        <div className="menu-list">
                            <a onClick={() => router.push(ROUTES.PROJECTS)}>
                                <div className="level is-mobile has-text-link">
                                    <div className="level-left">
                                        <div className="level-item">
                                            <p className="is-size-5">
                                                See all my checklists
                                            </p>
                                        </div>
                                    </div>
                                    <div className="level-right">
                                        <div className="level-item">
                                            <span className="icon">
                                                <i className="fas fa-arrow-right"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ) : null}
                </aside>
            ) : null 
        )
    )
}