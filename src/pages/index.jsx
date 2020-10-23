import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import RecentAuthUserProjectsMenu from '../components/RecentAuthUserProjectsMenu'
import { AuthUserContext } from '../components/Session'
import { useContext } from 'react'
import AddProject from '../components/AddProject'
import { useRouter } from 'next/router'

export default function Home() {
  const authUser = useContext(AuthUserContext);
  const router = useRouter(); 

  const handleSuccess = (id) => router.push(ROUTES.PROJECT(id))

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
      {authUser ? (
        <div>
          <section className="hero">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-centered">
                  <div className="column is-half">
                    <div className="block my-6">
                      <h1 className="title is-1 has-text-weight-bold">
                        Make a checklist
                      </h1>
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
        </div>
      ) : null}
    </App>
  )
}
