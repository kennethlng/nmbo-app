import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { useEffect } from 'react'
import { firebase } from '../lib/firebase'
import { useRouter } from 'next/router'

export default function PrivacyPolicy() {
  const router = useRouter();

  useEffect(() => {
    firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
      page_path: router.pathname,
      page_title: PAGE_TITLE.PRIVACY_POLICY,
      page_location: window.location.href
    })
  }, [])

  return (
    <App>
      <Head>
        <title>{META.PRIVACY_POLICY_TITLE}</title>
        <meta name="title" content={META.PRIVACY_POLICY_TITLE} />
        <meta property="og:url" content={META.URL + ROUTES.PRIVACY_POLICY} />
        <meta property="og:title" content={META.PRIVACY_POLICY_TITLE} />
        <meta property="twitter:url" content={META.URL + ROUTES.PRIVACY_POLICY} />
        <meta property="twitter:title" content={META.PRIVACY_POLICY_TITLE} />
      </Head>
      <p>Privacy Policy Page</p>
    </App>
  )
}
