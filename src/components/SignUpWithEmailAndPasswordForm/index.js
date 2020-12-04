import * as METHODS from '../../constants/methods';
import * as EVENTS from '../../constants/events'; 
import * as CONTENT_ID from '../../constants/contentId'; 
import * as CONTENT_TYPE from '../../constants/contentType'; 
import { auth, firebase } from '../../lib/firebase'
import * as EmailValidator from 'email-validator'
import { useState } from 'react';
import EmailPasswordSubmitForm from '../EmailPasswordSubmitForm'

export default function SignUpWithEmailAndPasswordForm(props) {
    const { onSuccess, onError } = props;
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailHelp('');
    }

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordHelp(''); 
    }

    const handleSubmit = () => {
        // Log event for sign up button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_UP_PAGE_SUBMIT_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (loading) return;

        // Validate email
        if (!EmailValidator.validate(email)) {
            setEmailHelp('Please enter a valid email');
            return 
        }

        setLoading(true); 

        // Link email and password
        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        auth.currentUser.linkWithCredential(credential)
        .then(function(usercred) {
            // Analytics: Log sign-up event
            firebase.analytics().logEvent(EVENTS.SIGN_UP, {
                method: METHODS.PASSWORD
            })

            setLoading(false); 

            onSuccess(usercred);
        }).catch(function (error) {
            // Log event for error code and message
            firebase.analytics().logEvent(EVENTS.SIGN_UP_ERROR, {
                error_code: error.code,
                error_message: error.message,
                method: METHODS.PASSWORD
            })

            setLoading(false); 

            onError(error); 
        });
    }

    return (
        <EmailPasswordSubmitForm
            email={email}
            password={password}
            emailHelp={emailHelp}
            passwordHelp={passwordHelp}
            onEmailChange={handleEmailChange}
            onPasswordChange={handlePasswordChange}
            onSubmit={handleSubmit}
            disabled={loading}
            submitText="Register"
        />
    )
}