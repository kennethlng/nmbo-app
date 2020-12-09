import Link from '@material-ui/core/Link';
import * as SOCIAL from '../../constants/social'; 
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'

export default function ContactLink() {
    const handleClick = e => {
        e.preventDefault(); 

        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.FOOTER_EMAIL_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Open link
        location.href = `mailto:${SOCIAL.EMAIL}`;
    }

    return (
        <Link component="button" variant="caption" onClick={handleClick} color="textSecondary">
            Contact us
        </Link>
    )
}