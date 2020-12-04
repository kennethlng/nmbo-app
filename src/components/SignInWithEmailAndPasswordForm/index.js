import * as METHODS from '../../constants/methods';
import * as EVENTS from '../../constants/events';
import * as CONTENT_TYPE from '../../constants/contentType'
import * as CONTENT_ID from '../../constants/contentId'
import { auth, firebase } from '../../lib/firebase';
import * as EmailValidator from 'email-validator'
import { useState } from 'react';
import EmailPasswordSubmitForm from '../EmailPasswordSubmitForm';

export default function SignInWithEmailAndPasswordForm(props) {
    const { onSuccess, onError } = props; 
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
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
        // Log event for sign in button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_SUBMIT_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (loading) return;

        // Validate email
        if (!EmailValidator.validate(email)) {
            setEmailHelp('Please enter a valid email');
            return 
        }

        setLoading(true); 

        // Sign in
        auth.signInWithEmailAndPassword(email, password)
        .then(function(result) {
            // Log event for successful login 
            firebase.analytics().logEvent(EVENTS.LOGIN, {
                method: METHODS.PASSWORD
            })

            setLoading(false); 

            onSuccess(result); 
        })
        .catch(function(error) {
            // Log event for sign in error
            firebase.analytics().logEvent(EVENTS.LOGIN_ERROR, {
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
            submitText="Sign In"
        />
    )
}