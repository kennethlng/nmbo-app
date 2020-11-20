import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as ROUTES from '../../constants/routes';
import * as DB from '../../constants/db'; 
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName';
import { useRouter } from 'next/router';
import { firebase } from '../../lib/firebase';

export default function UserProjectsListRow(props) {
    const { userProject } = props;
    const router = useRouter();

    const handleRowClick = () => {
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
        <ListItem button key={userProject[DB.ID]} onClick={handleRowClick}>
            <ListItemText
                primary={userProject[DB.TITLE]}
                secondary={userProject[DB.SNIPPET] ? userProject[DB.SNIPPET] : ''}
            />
        </ListItem>
    )
}