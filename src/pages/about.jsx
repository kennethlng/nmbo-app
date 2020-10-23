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
      <p>About Page</p>
    </App>
  )
}
