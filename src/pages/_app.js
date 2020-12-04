// import '../styles/styles.sass'
import { AuthUserContext } from '../components/Session'
import { AppStateContext } from '../components/AppState'
import { useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../styles/theme'
import Head from 'next/head'
import * as META from '../constants/meta'
import NProgress from 'nprogress'
import Router from 'next/router'
import 'nprogress/nprogress.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import { generateRandomDisplayName } from '../lib/generateRandomDisplayName'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [authUser, setAuthUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [routeLoading, setRouteLoading] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 

  useEffect(() => {
    // Necessary for server-side rendering with Material UI and Next.js
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    
    // Next.js router change listeners
    Router.events.on('routeChangeStart', (url) => {
      // NProgress.start()
      setRouteLoading(true); 
    })
    Router.events.on('routeChangeComplete', () => {
      // NProgress.done()
      setRouteLoading(false); 
    })
    Router.events.on('routeChangeError', () => {
      // NProgress.done()
      setRouteLoading(false); 
    })

    // AuthStateChanged listener
    const unsubscribe = auth.onAuthStateChanged(function (authUser) {
      if (authUser) {
        setAuthUser(authUser); 

        // If the authUser doesn't currently have a displayName, create one
        if (!authUser.displayName) {
          let displayName = generateRandomDisplayName(); 

          authUser.updateProfile({ displayName })
            .catch(function (error) {
              console.log("Error updating displayname: ", error);
            })
        }
      } else {
        setAuthUser(null);

        // Sign in anonymously
        auth.signInAnonymously()
          .catch(function (error) {
            console.log("Error updating displayname: ", error);
          });
      }
    })

    return () => unsubscribe();
  }, [])

  return (
    <AppStateContext.Provider value={{
      drawerOpen,
      setDrawerOpen: (open) => setDrawerOpen(open),
      routeLoading,
      snackbarOpen,
      setSnackbarOpen: (open) => setSnackbarOpen(open),
      snackbarMessage,
      setSnackbarMessage: (message) => setSnackbarMessage(message)
    }}>
      <AuthUserContext.Provider value={authUser}>
        <ToastContainer
          position="top-center"
        />
        <Head>
          <meta name="description" content={META.DESCRIPTION} />
          <meta property="og:description" content={META.DESCRIPTION} />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={META.IMAGE} />
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:image" content={META.IMAGE} />
          <meta property="twitter:description" content={META.DESCRIPTION} />
          <meta name="theme-color" content="#FF8370" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <script src="https://kit.fontawesome.com/442f26eabd.js" crossOrigin="anonymous"></script>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthUserContext.Provider>
    </AppStateContext.Provider>
  )
}