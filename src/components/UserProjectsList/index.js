import List from '@material-ui/core/List';
import UserProjectsListRow from '../UserProjectsListRow';
import * as DB from '../../constants/db'; 

export default function UserProjectsList(props) {
    const { userProjects } = props; 

    return (
        <List disablePadding>
            {userProjects.map(userProject => (
                <UserProjectsListRow 
                    key={userProject[DB.ID]}
                    userProject={userProject}
                />    
            ))}
        </List> 
    )
}