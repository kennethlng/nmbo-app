import App from '../components/App'; 
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import * as TOAST from '../constants/toast'
import * as EVENTS from '../constants/events'
import * as METHODS from '../constants/methods'
import * as PAGE_TITLE from '../constants/pageTitle'
import * as CONTENT_TYPE from '../constants/contentType'
import * as CONTENT_ID from '../constants/contentId'
import { useRouter } from 'next/router';
import { auth, firebase } from '../lib/firebase'
import Head from 'next/head'
import * as EmailValidator from 'email-validator'
import { toast } from 'react-toastify'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'; 
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', 
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2)
    }
}))

export default function SignIn() {
    const classes = useStyles(); 
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 

    useEffect(() => {
        // Log Google Analytics event for page view 
        firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
            page_path: router.pathname,
            page_title: PAGE_TITLE.SIGN_IN,
            page_location: window.location.href
        }); 
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Log event for sign in button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_SIGN_IN_BUTTON,
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
        .then(function() {
            // Log event for successful login 
            firebase.analytics().logEvent(EVENTS.LOGIN, {
                method: METHODS.PASSWORD
            })

            setLoading(false); 

            toast('Successfully signed in!', {
                autoClose: TOAST.autoClose,
                hideProgressBar: true
            })

            // Push route
            router.push(ROUTES.HOME);
        })
        .catch(function(error) {
            var errorMessage = error.message; 
            var errorCode = error.code;

            // Log event for sign in error
            firebase.analytics().logEvent(EVENTS.LOGIN_ERROR, {
                error_code: errorCode,
                error_message: errorMessage
            })

            setPasswordHelp(errorMessage); 

            // toast(error.message, {
            //     autoClose: TOAST.autoClose,
            //     hideProgressBar: true
            // })

            setLoading(false); 
        });
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailHelp('');
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordHelp(''); 
    }

    const handleSignUpClick = () => {
        // Log event for sign up button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_SIGN_UP_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route 
        router.push(ROUTES.SIGN_UP)
    }

    const handleForgotPassword = () => {
        // Log event for forgot password button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_FORGOT_PASSWORD_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // If the email is valid
        if (EmailValidator.validate(email)) {
            auth.sendPasswordResetEmail(email)
            .then(function() {
                toast('An email with instructions on how to reset your password was sent', {
                    hideProgressBar: true
                })
            })
            .catch(function(error) {
                console.log(error)
            })
        } else {
            toast('Please enter a valid email', {
                autoClose: TOAST.autoClose,
                hideProgressBar: true
            })
        }
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    return (    
        <App>
            <Head>
                <title>{META.SIGN_IN_TITLE}</title>
                <meta name="title" content={META.SIGN_IN_TITLE} />
                <meta property="og:url" content={META.URL + ROUTES.SIGN_IN} />
                <meta property="og:title" content={META.SIGN_IN_TITLE} />
                <meta property="twitter:url" content={META.URL + ROUTES.SIGN_IN} />
                <meta property="twitter:title" content={META.SIGN_IN_TITLE} />
            </Head>
            <Typography component="h1" variant="h3">
                Sign in
            </Typography>
            <Typography component="h3" variant="h6">
                Access your checklists anywhere you go
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    label="Email"
                    name="email"
                    autoComplete="email"
                    disabled={loading}
                    helperText={emailHelp}
                    onChange={handleEmailChange}
                />
                <TextField
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    label="Password"
                    name="password"
                    autoComplete="password"
                    disabled={loading}
                    helperText={passwordHelp}
                    onChange={handlePasswordChange}
                />
                <Button
                    className={classes.submit}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                    disableRipple
                    disabled={loading}
                    size="large"
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link variant="body2" onClick={handleSignUpClick}>
                            Need an account? Register
                        </Link>
                    </Grid>
                    <Grid item>
                        {/* <Link href="#" variant="body2">
                            Forgot password?
                        </Link> */}
                    </Grid>
                </Grid>
            </form>
        </App>
    )
}
