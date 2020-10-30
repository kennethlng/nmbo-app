import App from '../components/App'; 
import React, { useEffect, useState } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import * as METHODS from '../constants/methods';
import { useRouter } from 'next/router';
import { auth, firebase } from '../lib/firebase'
import Head from 'next/head'
import * as EmailValidator from 'email-validator'
import { toast } from 'react-toastify'
import * as TOAST from '../constants/toast'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 

    useEffect(() => {
        firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
            page_path: router.pathname,
            page_title: PAGE_TITLE.SIGN_UP,
            page_location: window.location.href
        })
    }, [])

    const handleSubmit = () => {
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

            setLoading(false); 

            toast('Account created!', {
                autoClose: TOAST.autoClose,
                hideProgressBar: true
            })

            router.push(ROUTES.HOME)
        }).catch(function (error) {
            console.log("Account linking error", error);

            toast('Something went wrong!', {
                autoClose: TOAST.autoClose,
                hideProgressBar: true
            })

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
                                    Access your checklists anywhere you go
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
                                                <button className={`button is-primary has-text-weight-bold ${loading ? "is-loading" : ""}`} onClick={handleSubmit}>Sign in</button>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <div className="control">
                                                <a onClick={() => router.push(ROUTES.SIGN_IN)}>Or sign in, if you already have an account</a>
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