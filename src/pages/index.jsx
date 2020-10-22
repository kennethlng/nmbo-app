import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import RecentAuthUserProjectsMenu from '../components/RecentAuthUserProjectsMenu'
import { AuthUserContext } from '../components/Session'
import { useContext } from 'react'

export default function Home() {
  const authUser = useContext(AuthUserContext);

  return (
    <App>
      <Head>
        <title>{META.TITLE}</title>
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
                      {/* <AddProject
                        onSuccess={handleSuccess}
                      /> */}
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
