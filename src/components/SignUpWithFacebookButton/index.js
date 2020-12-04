import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon';
import { firebase } from '../../lib/firebase';
import * as CONTENT_ID from '../../constants/contentId'; 
import * as CONTENT_TYPE from '../../constants/contentType'; 
import * as EVENTS from '../../constants/events'; 
import * as METHODS from '../../constants/methods'; 
import { useState } from 'react';

export default function SignUpWithFacebookButton(props) {
    const { onSuccess, onError } = props; 
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_UP_WITH_FACEBOOK_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (loading) return; 

        link(); 
    }

    const link = () => {
        setLoading(true); 

        var provider = new firebase.auth.FacebookAuthProvider(); 

        firebase.auth().currentUser.linkWithPopup(provider)
            .then(function (result) {
                // Log event for successful login 
                firebase.analytics().logEvent(EVENTS.SIGN_UP, {
                    method: METHODS.FACEBOOK
                })

                setLoading(false); 

                onSuccess(result); 
            })
            .catch(function (error) {
                // Log event for sign in error
                firebase.analytics().logEvent(EVENTS.SIGN_UP_ERROR, {
                    error_code: error.code,
                    error_message: error.message,
                    method: METHODS.FACEBOOK
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
            startIcon={<Icon className="fab fa-facebook-f" fontSize="small" />}
        >
            Continue with Facebook
        </Button>
    )
}