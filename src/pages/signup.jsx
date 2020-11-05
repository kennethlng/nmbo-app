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

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 
    const [showEmailVerificationNotification, setShowEmailVerificationNotification] = useState(false); 

    useEffect(() => {
        // Log event for page view 
        firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
            page_path: router.pathname,
            page_title: PAGE_TITLE.SIGN_UP,
            page_location: window.location.href
        })
    }, [])

    const handleSubmit = () => {
        // Log event for sign up button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_UP_PAGE_SIGN_UP_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (loading) return;

        if (!EmailValidator.validate(email)) {
            setEmailHelp('Please enter a valid email');
            return 
        }

        if (password === '') {
            setPasswordHelp('Please enter a password');
            return 
        }

        setLoading(true); 

        var credential = firebase.auth.EmailAuthProvider.credential(email, password);
        auth.currentUser.linkWithCredential(credential)
        .then(function(usercred) {
            var user = usercred.user;
            console.log("Account linking success", user);

            // Analytics: Log sign-up event
            firebase.analytics().logEvent(EVENTS.SIGN_UP, {
                method: METHODS.PASSWORD
            })
        })
        .then(function() {
            return auth.currentUser.sendEmailVerification({
                url: "https://nmbo.app",
                handleCodeInApp: false
            });
        })
        .then(function() {
            setLoading(false); 

            toast('Account created!', {
                hideProgressBar: true
            })

            setShowEmailVerificationNotification(true); 

            // Push route
            router.push(ROUTES.HOME);
        })
        .catch(function (error) {
            // console.log("Account linking error", error);
            var errorMessage = error.message; 
            var errorCode = error.code;

            // Log event for error code and message
            firebase.analytics().logEvent(EVENTS.SIGN_UP_ERROR, {
                errorCode,
                errorMessage
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
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-half">
                                <h1 className="title is-1 has-text-weight-bold">Create an account</h1>
                                <h2 className="subtitle is-4 has-text-grey">
                                    Save your checklists and access them anywhere you go.
                                </h2>
                                <div className="block">
                                    <fieldset disabled={loading}>
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input className="input" type="email" onChange={handleEmailChange}/>
                                            </div>
                                            <p className="help is-danger">{emailHelp}</p>
                                        </div>
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control">
                                                <input className="input" type="password" onChange={handlePasswordChange}/>
                                            </div>
                                            <p className="help is-danger">{passwordHelp}</p>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <button className={`button is-primary has-text-weight-bold ${loading ? "is-loading" : ""}`} onClick={handleSubmit}>Create account</button>
                                            </div>
                                        </div>

                                        {showEmailVerificationNotification ? (
                                            <div className="notification">
                                                An email was sent to your inbox for verification.
                                            </div>
                                        ) : null}

                                        <hr/>

                                        <div className="field">
                                            <div className="control">
                                                Already a member? <a onClick={handleSignInClick}>Log in</a>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </App>
    )
}