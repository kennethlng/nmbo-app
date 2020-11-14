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
import SectionTitle from '../components/SectionTitle'
import SectionSubtitle from '../components/SectionSubtitle'

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
      <section className="hero is-medium is-bold">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="columns is-centered">
              <div className="column is-three-fifths">
                <h1 className="title is-1 has-text-weight-bold">
                  NMBO is the fastest way to make a checklist with friends.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium">
        <div className="container">
          <div className="columns">
            <div className="column">
              
            </div>
            <div className="column">
              <SectionTitle
                content={<div>Share a link.<p>Share a checklist.</p></div>}
              />
              <SectionSubtitle
                content={<div>Creating and sharing a checklist is as easy as sending a link. Start a checklist and share the link on any of your favorite messaging apps.</div>}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium">
        <div className="container has-text-centered">
          <SectionTitle
            content={<div>No account needed to join. </div>}
          />
          <SectionSubtitle
            content={<div>Join a checklist with a link, even if you don’t have an account.</div>}
          />
        </div>
      </section>
      <section className="section is-medium">
        <div className="container">
          <div className="columns">
            <div className="column">
              <SectionTitle
                content={<div>Jump in <p>anytime.</p></div>}
              />
              <SectionSubtitle
                content={<div>NMBO lives on the web, so you can join a checklist from any web browser and from any device.</div>}
              />
            </div>
            <div className="column">
              
            </div>
          </div>
        </div>
      </section>
      <section className="section is-medium">
        <div className="container has-text-centered">
          <SectionTitle
            content={<div>Get stuff done together.</div>}
          />
          <SectionSubtitle
            content={<div>Invite as many people as you want to your checklist. Projects are more fun with other people.</div>}
          />
        </div>
      </section>
      <section className="section is-medium">
        <div className="container">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <SectionTitle
                content={<div>Frequently asked questions</div>}
              />
            </div>
          </div>
          <div className="block mt-6">
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
      </section>
      <Footer/>
    </App>
  )
}
