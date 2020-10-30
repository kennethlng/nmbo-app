import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { firebase } from '../lib/firebase'

export default function TermsOfService() {
  const router = useRouter();

  useEffect(() => {
    firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
      page_path: router.pathname,
      page_title: PAGE_TITLE.TERMS_OF_SERVICE,
      page_location: window.location.href
    })
  }, [])

  return (
    <App>
      <Head>
        <title>{META.TERMS_OF_SERVICE_TITLE}</title>
        <meta name="title" content={META.TERMS_OF_SERVICE_TITLE} />
        <meta property="og:url" content={META.URL + ROUTES.TERMS_OF_SERVICE} />
        <meta property="og:title" content={META.TERMS_OF_SERVICE_TITLE} />
        <meta property="twitter:url" content={META.URL + ROUTES.TERMS_OF_SERVICE} />
        <meta property="twitter:title" content={META.TERMS_OF_SERVICE_TITLE} />
      </Head>
      <p>Terms of Service Page</p>
    </App>
  )
}
