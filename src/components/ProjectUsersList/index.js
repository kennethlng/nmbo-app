import List from '@material-ui/core/List';
import ProjectUsersListRow from '../ProjectUsersListRow'
import * as DB from '../../constants/db'; 

export default function ProjectUsersList(props) {
    const { projectUsers } = props; 

    return (
        <List dense>
            {projectUsers.map(projectUser => (
                <ProjectUsersListRow key={projectUser[DB.ID]} projectUser={projectUser}/>
            ))}
        </List>
    )
}