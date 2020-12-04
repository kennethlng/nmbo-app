import Link from '@material-ui/core/Link';
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as ROUTES from '../../constants/routes'; 
import { firebase } from '../../lib/firebase'
import { useRouter } from 'next/router';

export default function SignUpLink() {
    const router = useRouter();

    const handleSignUpClick = (e) => {
        e.preventDefault(); 

        // Log event for sign up button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_SIGN_UP_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route 
        router.push(ROUTES.SIGN_UP)
    }

    return (
        <Link component="button" variant="body1" onClick={handleSignUpClick}>
            Need an account? Register
        </Link>
    )
}