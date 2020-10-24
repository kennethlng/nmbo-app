import App from '../components/App'; 
import React, { useState } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import { useRouter } from 'next/router';
import { auth, firebase } from '../lib/firebase'
import Head from 'next/head'

export default function SignUp() {
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [emailHelp, setEmailHelp] = useState(''); 
    const [passwordHelp, setPasswordHelp] = useState(''); 

    const handleSubmit = () => {
        if (loading) return;

        if (email === '') {
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

            setLoading(false); 

            router.push(ROUTES.HOME)
        }).catch(function (error) {
            console.log("Account linking error", error);
            setLoading(false); 
        });
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
                                <h1 className="title is-1 has-text-weight-bold">Sign up</h1>
                                <h2 className="subtitle is-4 has-text-grey">
                                    Access your projects anywhere you go
                                </h2>
                                <div className="block">
                                    <fieldset disabled={loading}>
                                        <div className="field">
                                            <label className="label">Email</label>
                                            <div className="control">
                                                <input className="input" type="email" onChange={e => setEmail(e.target.value)}/>
                                            </div>
                                            <p className="help is-danger">{emailHelp}</p>
                                        </div>
                                        <div className="field">
                                            <label className="label">Password</label>
                                            <div className="control">
                                                <input className="input" type="password" onChange={e => setPassword(e.target.value)}/>
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