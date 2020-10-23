import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'

export default function PrivacyPolicy() {
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
