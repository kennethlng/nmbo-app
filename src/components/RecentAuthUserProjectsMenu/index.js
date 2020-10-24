import React, { useContext, useEffect, useState } from 'react';
import { AuthUserContext } from '../Session'; 
import UserProjectsMenuList from '../UserProjectsMenuList'; 
import { UserProject } from '../../models/UserProject'; 
import * as DB from '../../constants/db'; 
import { db } from '../../lib/firebase';

export default function RecentAuthUserProjectsMenu() {
    const authUser = useContext(AuthUserContext); 
    const [userProjects, setUserProjects] = useState([]); 

    useEffect(() => {
        list(); 
    }, [])

    const list = () => {
        db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS).orderBy(DB.OPENED_ON, "desc").get()
        .then(function(querySnapshot) {
            var items = []; 
            querySnapshot.forEach(function(doc) {
                let item = new UserProject(doc); 
                items.push(item); 
            })
            setUserProjects(items); 
        }) 
        .catch(function(error) {
            console.log("Error listing current user's created projects: ", error); 
        })
    }

    return (
        userProjects.length > 0 ? (
            <aside className="menu">
                <p className="menu-label">
                    My Checklists
                </p>
                <UserProjectsMenuList
                    userProjects={userProjects}
                />
            </aside>
        ) : null 
    )
}