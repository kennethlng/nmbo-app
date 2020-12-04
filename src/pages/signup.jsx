import App from '../components/App'; 
import React, { useContext, useEffect } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import * as PAGE_TITLE from '../constants/pageTitle'
import * as ERROR_CODES from '../constants/errorCodes' 
import { useRouter } from 'next/router';
import { firebase } from '../lib/firebase'
import Head from 'next/head'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container'
import SignUpWithGoogleButton from '../components/SignUpWithGoogleButton';
import SignUpWithFacebookButton from '../components/SignUpWithFacebookButton'; 
import SignUpWithEmailAndPasswordForm from '../components/SignUpWithEmailAndPasswordForm';
import SignInLink from '../components/SignInLink';
import { AppStateContext } from '../components/AppState';

const useStyles = makeStyles(theme => ({
    body: {
        marginTop: theme.spacing(3),
    }
}))

export default function SignUp() {
    const router = useRouter();
    const classes = useStyles(); 
    const appState = useContext(AppStateContext); 

    useEffect(() => {
        // Log event for page view 
        firebase.analytics().logEvent('page_view', {
            page_path: router.pathname,
            page_title: PAGE_TITLE.SIGN_UP,
            page_location: window.location.href
        })
    }, [])

    const handleSuccess = (result) => {
        var user = result.user;

        console.log("Account linking success: ", user);

        // Snackbar
        appState.setSnackbarMessage("You're signed in!");
        appState.setSnackbarOpen(true); 

        // Push to home route
        router.push(ROUTES.HOME); 
    }

    const handleError = (error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("Error linking anonymous account: ", error)

        // Snackbar
        switch (errorCode) {
            case ERROR_CODES.EMAIL_ALREADY_IN_USE:
                appState.setSnackbarMessage("This email address is already in use.");
                break;
            case ERROR_CODES.CREDENTIAL_ALREADY_IN_USE: 
                appState.setSnackbarMessage("This email address is already in use.");
                break; 
            case ERROR_CODES.WEAK_PASSWORD:
                appState.setSnackbarMessage("Password should be at least 6 characters.")
                break;
            case ERROR_CODES.PROVIDER_ALREADY_LINKED:
                appState.setSnackbarMessage("You are already logged in.");
                break;
            default:
                appState.setSnackbarMessage("Oops! Something went wrong.");
        }
        appState.setSnackbarOpen(true); 
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
                <Typography component="h1" variant="h3" align="center">
                    Create an account
                </Typography>
                <Typography component="h3" variant="subtitle1" align="center">
                    Sync your checklists anywhere you go.
                </Typography>
                <Grid container spacing={3} className={classes.body}>
                    <Grid item xs={12}>
                        <SignUpWithGoogleButton
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <SignUpWithFacebookButton
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
                        <SignUpWithEmailAndPasswordForm
                            onSuccess={handleSuccess}
                            onError={handleError}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography align="center">
                            <SignInLink/>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </App>
    )
}