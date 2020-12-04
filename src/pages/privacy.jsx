import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { useEffect } from 'react'
import { firebase } from '../lib/firebase'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

export default function PrivacyPolicy() {
  const router = useRouter();

  useEffect(() => {
    firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
      page_path: router.pathname,
      page_title: PAGE_TITLE.PRIVACY_POLICY,
      page_location: window.location.href
    })
  }, [])

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
      <Container maxWidth="md">
        <Typography component="h1" variant="h3" gutterBottom>
          NMBO Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          At <span class="website_name">NMBO</span>, we collect and manage user data according to the following Privacy Policy.
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Data Collected
        </Typography>
        <Typography variant="body1" paragraph>
          <p>We collect information you provide directly to us. For example, we collect information when you create an account, subscribe, participate in any interactive features of our services, fill out a form, request customer support or otherwise communicate with us. The types of information we may collect include your name, email address, postal address, credit card information and other contact or identifying information you choose to provide.</p>
          <p>We collect anonymous data from every visitor of the Website to monitor traffic and fix bugs. For example, we collect information like web requests, the data sent in response to such requests, the Internet Protocol address, the browser type, the browser language, and a timestamp for the request.</p>
          <p>We also use various technologies to collect information, and this may include sending cookies to your computer. Cookies are small data files stored on your hard drive or in your device memory that helps us to improve our services and your experience, see which areas and features of our services are popular and count visits. We may also collect information using web beacons (also known as "tracking pixels"). Web beacons are electronic images that may be used in our services or emails and to track count visits or understand usage and campaign effectiveness. Our Privacy Policy was created with the help of the <a href="https://www.privacy-policy-template.com">Privacy Policy Template</a> and the <a href="https://www.generateprivacypolicy.com">Generate Privacy Policy Generator</a>.</p>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Use of the Data
        </Typography>
        <Typography variant="body1" paragraph>
          <p>We only use your personal information to provide you the <span class="website_name">NMBO</span> services or to communicate with you about the Website or the services.</p>
          <p>We employ industry standard techniques to protect against unauthorized access of data about you that we store, including personal information.</p>
          <p>We do not share personal information you have provided to us without your consent, unless:</p>
          <ul>
            <li>Doing so is appropriate to carry out your own request</li>
            <li>We believe it's needed to enforce our legal agreements or that is legally required</li>
            <li>We believe it's needed to detect, prevent or address fraud, security or technical issues</li>
          </ul>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Sharing of Data
        </Typography>
        <Typography variant="body1" paragraph>
          <p>We don't share your personal information with third parties. Aggregated, anonymized data is periodically transmitted to external services to help us improve the Website and service.</p>
          <p>We may allow third parties to provide analytics services. These third parties may use cookies, web beacons and other technologies to collect information about your use of the services and other websites, including your IP address, web browser, pages viewed, time spent on pages, links clicked and conversion information.</p>
          <p>We also use social buttons provided by services like Twitter, Google+, LinkedIn and Facebook. Your use of these third party services is entirely optional. We are not responsible for the privacy policies and/or practices of these third party services, and you are responsible for reading and understanding those third party services' privacy policies.</p>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Cookies
        </Typography>
        <Typography variant="body1" paragraph>
          <p>We may use cookies on our site to remember your preferences.</p>
          <p>For more general information on cookies, please read <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.</p>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Opt-Out, Communication Preferences
        </Typography>
        <Typography variant="body1" paragraph>
          <p>You may modify your communication preferences and/or opt-out from specific communications at any time. Please specify and adjust your preferences.</p>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Security
        </Typography>
        <Typography variant="body1" paragraph>
          <p>We take reasonable steps to protect personally identifiable information from loss, misuse, and unauthorized access, disclosure, alteration, or destruction. But, you should keep in mind that no Internet transmission is ever completely secure or error-free. In particular, email sent to or from the Sites may not be secure.</p>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          About Children
        </Typography>
        <Typography variant="body1" paragraph>
          <p>The Website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information via the Website from visitors in this age group.</p>
        </Typography>

        <Typography component="h3" variant="h4" gutterBottom>
          Changes to the Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          <p>The Website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information via the Website from visitors in this age group.</p>
          <p>We may amend this Privacy Policy from time to time. Use of information we collect now is subject to the Privacy Policy in effect at the time such information is used.</p>
          <p>If we make major changes in the way we collect or use information, we will notify you by posting an announcement on the Website or sending you an email.</p>
        </Typography>
      </Container>
    </App>
  )
}
