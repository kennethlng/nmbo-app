import App from '../components/App'; 
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import * as METHODS from '../constants/methods';
import * as TOAST from '../constants/toast'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import * as CONTENT_TYPE from '../constants/contentType'
import * as CONTENT_ID from '../constants/contentId'
import { useRouter } from 'next/router';
import { auth, firebase } from '../lib/firebase'
import Head from 'next/head'
import * as EmailValidator from 'email-validator'
import { toast } from 'react-toastify'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'; 
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 2)
    }
}))

export default function SignUp() {
    const router = useRouter();
    const classes = useStyles(); 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 

    useEffect(() => {
        // Log event for page view 
        firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
            page_path: router.pathname,
            page_title: PAGE_TITLE.SIGN_UP,
            page_location: window.location.href
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // Log event for sign up button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_UP_PAGE_SIGN_UP_BUTTON,
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
            var user = usercred.user;
            console.log("Account linking success", user);

            // Analytics: Log sign-up event
            firebase.analytics().logEvent(EVENTS.SIGN_UP, {
                method: METHODS.PASSWORD
            })

            setLoading(false); 

            toast('Account created!', {
                autoClose: TOAST.autoClose,
                hideProgressBar: true
            })

            // Push route
            router.push(ROUTES.HOME)
        }).catch(function (error) {
            // console.log("Account linking error", error);
            var errorMessage = error.message; 
            var errorCode = error.code;

            // Log event for error code and message
            firebase.analytics().logEvent(EVENTS.SIGN_UP_ERROR, {
                error_code: errorCode,
                error_message: errorMessage
            })

            setPasswordHelp(errorMessage); 

            // toast('Something went wrong!', {
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

    const handleSignInClick = () => {
        // Log event for button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_UP_PAGE_SIGN_IN_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        // Push route
        router.push(ROUTES.SIGN_IN)
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return (
        <App>
            <Head>
                <title>{META.SIGN_UP_TITLE}</title>
                <meta name="title" content={META.SIGN_UP_TITLE} />
                <meta property="og:url" content={META.URL + ROUTES.SIGN_UP} />
                <meta property="og:title" content={META.SIGN_UP_TITLE} />
                <meta property="twitter:url" content={META.URL + ROUTES.SIGN_UP} />
                <meta property="twitter:title" content={META.SIGN_UP_TITLE} />
            </Head>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h3">
                    Create an account
                </Typography>
                <Typography component="h3" variant="h6">
                    Save the checklists you've created and opened and access them anywhere you go.
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
                        type="password"
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
                        size="large"
                        disableElevation
                        disableRipple
                        disabled={loading}
                    >
                        Create Account
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" onClick={handleSignInClick}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </App>
    )
}