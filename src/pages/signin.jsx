import App from '../components/App'; 
import React, { useState } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase'
import Head from 'next/head'
import * as EmailValidator from 'email-validator'
import { toast } from 'react-toastify'
import * as TOAST from '../constants/toast'

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 

    const handleSubmit = () => {
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
            setLoading(false); 

            toast('Successfully signed in!', {
                autoClose: TOAST.autoClose,
                hideProgressBar: true
            })

            router.push(ROUTES.HOME);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage); 

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
                                                <a onClick={() => router.push(ROUTES.SIGN_UP)}>Or sign up, if you don't have an account yet</a>
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
