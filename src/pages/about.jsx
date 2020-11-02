import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { useEffect } from 'react'
import { firebase } from '../lib/firebase'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import { faqs } from '../constants/faqs'
import AddProject from '../components/AddProject'

const FeatureTile = (props) => {
  const { title, subtitle } = props; 

  return (
    <article className="tile is-child notification">
      <h5 className="title is-spaced">
        {title}
      </h5>
      <h6 className="subtitle">
        {subtitle}
      </h6>
    </article>
  )
}

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
            <div className="columns">
              <div className="column is-two-thirds">
                <h1 className="title is-1 has-text-weight-bold">
                  The fastest way to make a checklist with friends
                </h1>
                <h2 className="subtitle is-3">
                  Just copy the link and share it. 
                  <p>It's free to use. No account or download needed.</p>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <FeatureTile
                title="✅"
                subtitle={<div>Create a <strong className="has-text-primary has-text-weight-bold">checklist</strong> for whatever you need. Party supplies, groceries, weekend trip, etc.</div>}
              />
            </div>
            <div className="tile is-parent">
              <FeatureTile
                title="🤳"
                subtitle={<div><strong className="has-text-primary has-text-weight-bold">Copy the URL and share it</strong> with your friends using your favorite messaging apps.</div>}
              />
            </div>
            <div className="tile is-parent">
              <FeatureTile
                title="🥳"
                subtitle={<div>Cross items off the list. <strong className="has-text-primary has-text-weight-bold">Get stuff done together.</strong></div>}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="section is-medium">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is is-half">
              <AddProject/>
            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="section">
        <div className="container">
          <h3 className="title has-text-weight-bold">
            FAQS
          </h3>
          <div className="block">
            <div className="columns is-multiline">
              {faqs.map((faq, index) => (
                <div className="column is-one-third block" key={index}>
                  <p className="title is-4">
                    {faq.question}
                  </p>
                  {faq.answer}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
      <Footer/>
    </App>
  )
}
