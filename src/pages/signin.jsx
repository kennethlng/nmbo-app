import App from '../components/App'; 
import React, { useState } from 'react';
import * as ROUTES from '../constants/routes'; 
import * as META from '../constants/meta'; 
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase'
import Head from 'next/head'

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (email === '' || password === '') {
            return 
        }

        setLoading(true); 

        auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            setLoading(false); 

            router.push(ROUTES.HOME);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage); 

            setLoading(false); 
        });
    }

    return (    
        <App>
            <Head>
                {META.SIGN_IN_TITLE}
            </Head>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-half">
                                <h1 className="title is-1 has-text-weight-bold">Sign in</h1>
                                <h2 className="subtitle is-4 has-text-grey">
                                    Access your projects anywhere you go
                                </h2>
                                <div className="block">
                                    <div className="field">
                                        <label className="label">Email</label>
                                        <div className="control">
                                            <input className="input" type="email" onChange={e => setEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Password</label>
                                        <div className="control">
                                            <input className="input" type="password" onChange={e => setPassword(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="columns is-vcentered is-mobile">
                                        <div className="column is-narrow">
                                            <div className="field">
                                                <div className="control">
                                                    <button className={`button is-primary has-text-weight-bold ${loading ? "is-loading" : ""}`} onClick={handleSubmit}>Sign in</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column has-text-right">
                                            <a onClick={() => router.push(ROUTES.SIGN_UP)}>Or sign up, if you don't have an account yet</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </App>
    )
}
