import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import RecentAuthUserProjectsMenu from '../components/RecentAuthUserProjectsMenu'
import { AuthUserContext } from '../components/Session'
import { useContext, useEffect } from 'react'
import AddProject from '../components/AddProject'
import { useRouter } from 'next/router'
import { firebase } from '../lib/firebase'

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
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half">
                <div className="block">
                  <AddProject
                    onSuccess={handleSuccess}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <RecentAuthUserProjectsMenu/>
            </div>
          </div>
        </div>
      </section>
    </App>
  )
}
