import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { useEffect } from 'react'
import { firebase } from '../lib/firebase'
import { useRouter } from 'next/router'

export default function About() {
  const router = useRouter();

  useEffect(() => {
    firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
      page_path: router.pathname,
      page_title: PAGE_TITLE.ABOUT,
      page_location: window.location.href
    })
  }, [])

  return (
    <App>
      <Head>
        <title>{META.ABOUT_TITLE}</title>
        <meta name="title" content={META.ABOUT_TITLE} />
        <meta property="og:url" content={META.URL + ROUTES.ABOUT} />
        <meta property="og:title" content={META.ABOUT_TITLE} />
        <meta property="twitter:url" content={META.URL + ROUTES.ABOUT} />
        <meta property="twitter:title" content={META.ABOUT_TITLE} />
      </Head>
      <section className="hero is-medium is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 is-spaced has-text-weight-bold">
              {META.SLOGAN}
            </h1>
            <h2 className="subtitle is-3">
              {META.DESCRIPTION}
            </h2>
          </div>
        </div>
      </section>
    </App>
  )
}
