import Logo from '../Logo'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as ROUTES from '../../constants/routes'
import { useRouter } from 'next/router'
import { firebase } from '../../lib/firebase'

export default function LogoNavBarItemButton() {
    const router = useRouter(); 
    
    const handleClick = () => {
        // Log Google Analytics event for button click
        firebase.analytics().logEvent('select_content', {
          content_id: CONTENT_ID.HEADER_LOGO_BUTTON,
          content_type: CONTENT_TYPE.BUTTON
        })
    
        // Push route
        if (location.pathname === ROUTES.HOME) {
          window.location.reload();
        } else {
          router.push(ROUTES.HOME);
        }
      }

    return (
        <a className="navbar-item" onClick={handleClick}>
            <Logo />
        </a>
    )
}