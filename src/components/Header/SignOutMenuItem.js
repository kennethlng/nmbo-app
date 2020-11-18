import { firebase } from '../../lib/firebase'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import * as EVENTS from '../../constants/events'
import { auth } from '../../lib/firebase'
import MenuItem from '@material-ui/core/MenuItem';

export default function SignOutMenuItem() {
    const router = useRouter();

    const handleSignOutClick = () => {
        // Log Google Analytics event for button click 
        firebase.analytics().logEvent('select_content', {
            content_type: CONTENT_TYPE.BUTTON,
            content_id: CONTENT_ID.HEADER_SIGN_OUT_BUTTON
        })

        // Sign out
        auth.signOut()
            .then(function () {
                // Push route to home page
                router.push(ROUTES.HOME);

                // Log Google Analytics event for sign out success
                firebase.analytics().logEvent(EVENTS.SIGN_OUT_SUCCESS);
            }).catch(function (error) {
                console.log("Error signing out: ", error)

                // Log Google Analytics event for sign out error 
                firebase.analytics().logEvent(EVENTS.SIGN_OUT_ERROR, {
                    error_code: error.code,
                    error_message: error.message
                })
            });
    }

    return (
        <MenuItem onClick={handleSignOutClick}>
            👋 Sign out
        </MenuItem>
    )
}