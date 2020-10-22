import React from 'react';
import * as DB from '../../constants/db'; 
import UserProjectsMenuListRow from '../UserProjectsMenuListRow'; 

export default function UserProjectsMenuList(props) {
    const { userProjects } = props;     

    return (
        <ul className="menu-list">
            {userProjects.map(userProject => (
                <li key={userProject[DB.ID]}>
                    <UserProjectsMenuListRow userProject={userProject}/>
                </li>
            ))}
        </ul>
    )
}