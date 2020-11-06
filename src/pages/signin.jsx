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

export default function SignIn() {
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

    const handleSubmit = () => {
        // Log event for sign in button click 
        firebase.analytics().logEvent('select_content', {
            content_id: CONTENT_ID.SIGN_IN_PAGE_SIGN_IN_BUTTON,
            content_type: CONTENT_TYPE.BUTTON
        })

        if (loading) return;

        if (!EmailValidator.validate(email)) {
            setEmailHelp('Please enter a valid email');
            return 
        }

        if (password === '') {
            setPasswordHelp('Please enter a password')
            return;
        }

        setLoading(true); 

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
            handleSubmit();
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
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-half">
                                <h1 className="title is-1 has-text-weight-bold">Sign in</h1>
                                <h2 className="subtitle is-4 has-text-grey">
                                    Access your checklists anywhere you go
                                </h2>
                                <div className="block">
                                    <fieldset disabled={loading}>
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input className="input" type="email" onChange={handleEmailChange} onKeyPress={handleEnterKeyPress}/>
                                            </div>
                                            <p className="help is-danger">{emailHelp}</p>
                                        </div>
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control">
                                                <input className="input" type="password" onChange={handlePasswordChange} onKeyPress={handleEnterKeyPress}/>
                                            </div>
                                            <p className="help is-danger">{passwordHelp}</p>
                                        </div>
                                        {/* <div className="field">
                                            <div className="control">
                                                <a onClick={handleForgotPassword}>Forgot your password?</a>
                                            </div>
                                        </div> */}
                                        
                                        <div className="field">
                                            <div className="control">
                                                <button className={`button is-primary has-text-weight-bold ${loading ? "is-loading" : ""}`} onClick={handleSubmit}>Sign in</button>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="field">
                                            <div className="control">
                                                Need an account? <a onClick={handleSignUpClick}>Register</a>
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
