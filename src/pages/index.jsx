import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { AuthUserContext } from '../components/Session'
import { useContext, useEffect } from 'react'
import AddProject from '../components/AddProject'
import { useRouter } from 'next/router'
import { firebase } from '../lib/firebase'
import RecentAuthUserProjects from '../components/RecentAuthUserProjects'
import Grid from '@material-ui/core/Grid'

export default function Home() {
  const authUser = useContext(AuthUserContext);
  const router = useRouter(); 

  const handleSuccess = (id) => router.push(ROUTES.PROJECT(id))

  useEffect(() => {
    firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
      page_path: router.pathname,
      page_title: PAGE_TITLE.HOME,
      page_location: window.location.href
    })
  }, [])

  return (
    <App>
      <Head>
        <title>{META.TITLE}</title>
        <meta name="title" content={META.TITLE}/>
        <meta property="og:url" content={META.URL}/>
        <meta property="og:title" content={META.TITLE}/>
        <meta property="twitter:url" content={META.URL}/>
        <meta property="twitter:title" content={META.TITLE}/>
      </Head>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <AddProject
            onSuccess={handleSuccess}
          />
        </Grid>
        <Grid item xs={12}>
          <RecentAuthUserProjects/>
        </Grid>
      </Grid>
    </App>
  )
}
