import Link from '@material-ui/core/Link';
import * as ROUTES from '../../constants/routes'; 
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'
import { useRouter } from 'next/router';

export default function PrivacyPolicyLink() {
    const router = useRouter(); 

    const handleClick = e => {
        e.preventDefault(); 

        // Log analytics event
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.FOOTER_PRIVACY_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        router.push(ROUTES.PRIVACY_POLICY); 
    }

    return (
        <Link component="button" variant="caption" onClick={handleClick} color="textSecondary">
            Privacy
        </Link>
    )
}