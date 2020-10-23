import '../styles/styles.sass'
import { AuthUserContext } from '../components/Session'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import '@fortawesome/fontawesome-free/css/all.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import * as META from '../constants/meta'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [authUser, setAuthUser] = useState(null); 

  useEffect(() => {
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
      <ToastContainer/>
      <Head>
        <meta name="description" content={META.DESCRIPTION}/>
        <meta property="og:description" content={META.DESCRIPTION}/>
        <meta property="og:type" content="website" />
        <meta property="og:image" content={META.IMAGE} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={META.IMAGE} />
        <meta property="twitter:description" content={META.DESCRIPTION}/>
      </Head>
      <Component {...pageProps} />  
    </AuthUserContext.Provider>
  )
}