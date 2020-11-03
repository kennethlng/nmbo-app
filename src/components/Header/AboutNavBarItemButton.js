import { useRouter } from 'next/router'
import { firebase } from '../../lib/firebase'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as ROUTES from '../../constants/routes'

export default function AboutNavBarItemButton() {
    const router = useRouter(); 

    const handleClick = () => {
        // Log Google Analytics event for button click
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.HEADER_ABOUT_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push routes
        router.push(ROUTES.ABOUT)
    }

    return (
        <a className="navbar-item" onClick={handleClick}>
            About
        </a>
    )
}