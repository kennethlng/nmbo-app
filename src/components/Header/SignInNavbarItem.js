import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase } from '../../lib/firebase'

export default function SignInNavbarItem() {
    const router = useRouter();

    const handleClick = () => {
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.BUTTON,
            content_id: CONTENT_ID.HEADER_SIGN_IN_BUTTON
        })

        // Push route
        router.push(ROUTES.SIGN_IN)
    }

    return (
        <a className="navbar-item" onClick={handleClick}>
            Log in
        </a>
    )
}