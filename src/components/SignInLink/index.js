import Link from '@material-ui/core/Link';
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as ROUTES from '../../constants/routes'
import { firebase } from '../../lib/firebase'
import { useRouter } from 'next/router'

export default function SignInLink() {
    const router = useRouter(); 

    const handleSignInClick = (e) => {
        e.preventDefault(); 

        // Log event for button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_UP_PAGE_SIGN_IN_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route
        router.push(ROUTES.SIGN_IN)
    }

    return (
        <Link component="button" variant="body1" onClick={handleSignInClick}>
            Already have an account? Sign in
        </Link>
    )
}