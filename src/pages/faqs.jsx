import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'

export default function FAQS() {
  return (
    <App>
      <Head>
        <title>{META.FAQS_TITLE}</title>
        <meta name="title" content={META.FAQS_TITLE} />
        <meta property="og:url" content={META.URL + ROUTES.FAQS} />
        <meta property="og:title" content={META.FAQS_TITLE} />
        <meta property="twitter:url" content={META.URL + ROUTES.FAQS} />
        <meta property="twitter:title" content={META.FAQS_TITLE} />
      </Head>
      <p>FAQS Page</p>
    </App>
  )
}
