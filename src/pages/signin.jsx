import App from '../components/App'; 
import React, { useContext, useEffect } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import * as PAGE_TITLE from '../constants/pageTitle'
import * as ERROR_CODES from '../constants/errorCodes';
import { useRouter } from 'next/router';
import { firebase } from '../lib/firebase'
import { AppStateContext } from '../components/AppState';
import Head from 'next/head'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'; 
import Container from '@material-ui/core/Container'
import SignInWithGoogleButton from '../components/SignInWithGoogleButton'; 
import SignInWithFacebookButton from '../components/SignInWithFacebookButton'; 
import SignInWithEmailAndPasswordForm from '../components/SignInWithEmailAndPasswordForm'
import SignUpLink from '../components/SignUpLink'; 
import { makeStyles } from '@material-ui/core/styles'; 
import ForgotPasswordLink from '../components/ForgotPasswordLink';

const useStyles = makeStyles(theme => ({
    body: {
        marginTop: theme.spacing(3),
    }
}))

export default function SignIn() {
    const router = useRouter();
    const classes = useStyles(); 
    const appState = useContext(AppStateContext); 

    useEffect(() => {
        // Log Google Analytics event for page view 
        firebase.analytics().logEvent('page_view', {
            page_path: router.pathname,
            page_title: PAGE_TITLE.SIGN_IN,
            page_location: window.location.href
        }); 
    }, [])

    const handleSuccess = (result) => {
        var user = result.user;

        console.log("Successfully signed in as: ", user);

        // Snackbar
        appState.setSnackbarMessage("You're signed in!");
        appState.setSnackbarOpen(true); 

        // Push route
        router.push(ROUTES.HOME);
    }

    const handleError = (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Error signing in: ", error)

        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

        // Snackbar
        switch (errorCode) {
            case ERROR_CODES.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL:
                appState.setSnackbarMessage("An account already exists with this email.");
                break;
            case ERROR_CODES.USER_NOT_FOUND:
                appState.setSnackbarMessage("An account with this email doesn't exist.");
                break;
            case ERROR_CODES.WRONG_PASSWORD:
                appState.setSnackbarMessage("Wrong password");
                break;
            default:
                appState.setSnackbarMessage("Oops! Something went wrong. Please try again.");
        }
        appState.setSnackbarOpen(true); 
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
            <Container maxWidth="sm">
                <Typography component="h1" variant="h3" align="center">
                    Sign in
                </Typography>
                <Typography component="h3" variant="subtitle1" align="center">
                    Access your checklists anywhere you go.
                </Typography>
                <Grid container spacing={3} className={classes.body}>
                    <Grid item xs={12}>
                        <SignInWithGoogleButton 
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <SignInWithFacebookButton 
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" align="center">
                            or
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SignInWithEmailAndPasswordForm
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="center">
                            <SignUpLink/>   
                        </Typography>
                    </Grid>
                    {/* <Grid item>
                        <ForgotPasswordLink
                            email={email}
                        />
                    </Grid> */}
                </Grid>
            </Container>
        </App>
    )
}
