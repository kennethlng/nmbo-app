import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as SOCIAL from '../../constants/social'
import { firebase } from '../../lib/firebase'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'

export default function EmailListItem() {
    const handleClick = () => {
        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.FOOTER_EMAIL_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Open link
        location.href = `mailto:${SOCIAL.EMAIL}`;
    }

    return (
        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <EmailRoundedIcon/>
            </ListItemIcon>
            <ListItemText>
                Contact us
            </ListItemText>
        </ListItem>
    )
}