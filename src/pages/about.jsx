import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'

export default function About() {
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
