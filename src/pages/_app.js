import '../styles/styles.sass'
import { AuthUserContext } from '../components/Session'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import * as META from '../constants/meta'
import NProgress from 'nprogress'
import Router from 'next/router'
import 'nprogress/nprogress.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [authUser, setAuthUser] = useState(null); 

  useEffect(() => {
    Router.events.on('routeChangeStart', (url) => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())

    // AuthStateChanged listener
    const unsubscribe = auth.onAuthStateChanged(function (authUser) {
      if (authUser) {
        setAuthUser(authUser)
      } else {
        setAuthUser(null);

        auth.signInAnonymously()
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorMessage);
          });
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthUserContext.Provider value={authUser}>
      <ToastContainer
        position="top-center"
      />
      <Head>
        <meta name="description" content={META.DESCRIPTION}/>
        <meta property="og:description" content={META.DESCRIPTION}/>
        <meta property="og:type" content="website" />
        <meta property="og:image" content={META.IMAGE} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={META.IMAGE} />
        <meta property="twitter:description" content={META.DESCRIPTION}/>
        <meta name="theme-color" content="#FF8370" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"/>
        <script src="https://kit.fontawesome.com/442f26eabd.js" crossorigin="anonymous"></script>
      </Head>
      <Component {...pageProps} />  
    </AuthUserContext.Provider>
  )
}