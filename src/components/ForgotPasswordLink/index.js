import Link from '@material-ui/core/Link';
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { firebase, auth } from '../../lib/firebase'
import * as EmailValidator from 'email-validator'

export default function ForgotPasswordLink(props) {
    const { email } = props; 

    const handleClick = () => {
        // Log event for forgot password button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_FORGOT_PASSWORD_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // If the email is valid
        if (EmailValidator.validate(email)) {
            auth.sendPasswordResetEmail(email)
            .then(function() {
                // toast('An email with instructions on how to reset your password was sent', {
                //     hideProgressBar: true
                // })
            })
            .catch(function(error) {
                console.log(error)
            })
        } else {
            // toast('Please enter a valid email', {
            //     autoClose: TOAST.autoClose,
            //     hideProgressBar: true
            // })
        }
    }

    return (
        <Link component="button" variant="body1" onClick={handleClick}>
            Forgot password?
        </Link>
    )
}