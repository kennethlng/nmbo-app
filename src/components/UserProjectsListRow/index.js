import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import * as ROUTES from '../../constants/routes';
import * as DB from '../../constants/db'; 
import * as LIST_ID from '../../constants/listId';
import * as LIST_NAME from '../../constants/listName';
import { useRouter } from 'next/router';
import { firebase } from '../../lib/firebase';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { getDayName } from '../../lib/getDayName';

export default function UserProjectsListRow(props) {
    const { userProject } = props;
    const router = useRouter();
    const [secondaryText, setSecondaryText] = useState(''); 

    useEffect(() => {
        let string = ''; 
        const relevantOn = userProject[DB.RELEVANT_ON];
        const snippet = userProject[DB.SNIPPET];

        if (snippet) string += snippet; 
        if (snippet && relevantOn) string += " ・ ";
        if (relevantOn) string += getDayName(relevantOn.toDate().getDay());

        setSecondaryText(string);
    }, [userProject])

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
                primary={(
                    <Typography variant="body1">
                        <strong>{userProject[DB.TITLE]}</strong>
                    </Typography>
                )}
                secondary={secondaryText}
            />
        </ListItem>
    )
}