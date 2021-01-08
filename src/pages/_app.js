// import '../styles/styles.sass'
import { AuthUserContext } from '../components/Session'
import { AppStateContext } from '../components/AppState'
import { useEffect, useState } from 'react'
import { auth, db } from '../lib/firebase'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from '../styles/theme'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as DB from '../constants/db'
import { UserProject } from '../models/UserProject'
import Router from 'next/router'
import CssBaseline from '@material-ui/core/CssBaseline'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  const [authUser, setAuthUser] = useState(null);
  const [recentUserProjects, setRecentUserProjects] = useState([]); 
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [routeLoading, setRouteLoading] = useState(false); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [settingsOpen, setSettingsOpen] = useState(false); 

  useEffect(() => {
    // Necessary for server-side rendering with Material UI and Next.js
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    
    // Next.js router change listeners
    Router.events.on('routeChangeStart', (url) => {
      setRouteLoading(true); 
    })
    Router.events.on('routeChangeComplete', () => {
      setRouteLoading(false); 
    })
    Router.events.on('routeChangeError', () => {
      setRouteLoading(false); 
    })

    // AuthStateChanged listener
    const unsubscribe = auth.onAuthStateChanged(function (authUser) {
      if (authUser) {
        setAuthUser(authUser); 
      } else {
        setAuthUser(null);

        // Sign in anonymously
        auth.signInAnonymously()
          .catch(function (error) {
            console.log("Error updating displayname: ", error);
          });
      }
    })

    return () => {
      unsubscribe();
    }
  }, [])

  useEffect(() => {
    var unsubscribe;

    // Recent auth user projects listener
    if (authUser) {
      // Set last week date as start date
      var startDate = Date.now() - 604800000;
      var startDateObj = new Date(startDate);

      unsubscribe = db.collection(DB.USERS).doc(authUser.uid).collection(DB.USER_PROJECTS)
        .where(DB.OPENED_ON, '>=', startDateObj)
        .orderBy(DB.OPENED_ON, "desc")
        .limit(10)
        .onSnapshot(function (querySnapshot) {
          var items = [];
          querySnapshot.forEach(function (doc) {
            let item = new UserProject(doc);
            items.push(item);
          })
          setRecentUserProjects(items);
        })
    }

    return () => {
      if (unsubscribe != null) unsubscribe(); 
    }
  }, [authUser])

  return (
    <AppStateContext.Provider value={{
      drawerOpen,
      setDrawerOpen: (open) => setDrawerOpen(open),
      routeLoading,
      snackbarOpen,
      setSnackbarOpen: (open) => setSnackbarOpen(open),
      snackbarMessage,
      setSnackbarMessage: (message) => setSnackbarMessage(message),
      recentUserProjects,
      settingsOpen,
      setSettingsOpen: (open) => setSettingsOpen(open)
    }}>
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
      <AuthUserContext.Provider value={authUser}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthUserContext.Provider>
    </AppStateContext.Provider>
  )
}