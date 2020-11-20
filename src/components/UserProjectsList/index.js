import List from '@material-ui/core/List';
import UserProjectsListRow from '../UserProjectsListRow';

export default function UserProjectsList(props) {
    const { userProjects } = props; 

    return (
        <List>
            {userProjects.map(userProject => (
                <UserProjectsListRow userProject={userProject}/>    
            ))}
        </List>
    )
}