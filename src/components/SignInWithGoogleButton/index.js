import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import { firebase } from '../../lib/firebase';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as CONTENT_TYPE from '../../constants/contentType'; 
import * as EVENTS from '../../constants/events'; 
import * as METHODS from '../../constants/methods'; 
import { useState } from 'react';

export default function SignInWithGoogleButton(props) {
    const { onSuccess, onError } = props; 
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_WITH_GOOGLE_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (loading) return; 

        signIn(); 
    }

    const signIn = () => {
        setLoading(true); 

        var provider = new firebase.auth.GoogleAuthProvider(); 

        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                // Log event for successful login 
                firebase.analytics().logEvent(EVENTS.LOGIN, {
                    method: METHODS.GOOGLE
                })

                setLoading(false); 

                onSuccess(result); 
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log("Error signing in with Google: ", error)

                // Log event for sign in error
                firebase.analytics().logEvent(EVENTS.LOGIN_ERROR, {
                    error_code: errorCode,
                    error_message: errorMessage,
                    method: METHODS.GOOGLE
                })

                setLoading(false); 

                onError(error);
            });
    }

    return (
        <Button
            onClick={handleClick}
            variant="contained"
            disableElevation
            disableRipple
            fullWidth
            disabled={loading}
            size="large"
            startIcon={<Icon className="fab fa-google" fontSize="small" />}
        >
            Continue with Google
        </Button>
    )
}