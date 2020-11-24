import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as SOCIAL from '../../constants/social'
import { firebase } from '../../lib/firebase'
import IconButton from '@material-ui/core/IconButton'
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';

export default function EmailButton() {
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
        <IconButton
            onClick={handleClick}
        >
            <EmailRoundedIcon/>
        </IconButton>
    )
}