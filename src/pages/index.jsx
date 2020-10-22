import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'

export default function Home() {
  return (
    <App>
      <Head>
        <title>{META.TITLE}</title>
      </Head>
      <p>Index Page</p>
    </App>
  )
}
