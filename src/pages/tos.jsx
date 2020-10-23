import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'

export default function TermsOfService() {
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
