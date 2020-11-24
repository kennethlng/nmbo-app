import App from '../components/App'
import Head from 'next/head'
import * as META from '../constants/meta'
import * as ROUTES from '../constants/routes'
import * as EVENTS from '../constants/events'
import * as PAGE_TITLE from '../constants/pageTitle'
import { useContext, useEffect } from 'react'
import AddProject from '../components/AddProject'
import { useRouter } from 'next/router'
import { firebase } from '../lib/firebase'
import RecentAuthUserProjects from '../components/RecentAuthUserProjects'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3)
  },
  feature: {
    // marginBottom: theme.spacing(4)
  }
}))

const features = [
  {
    emoji: "💌",
    title: "Share the link to share the checklist.",
    description: "Creating and sharing a checklist is as easy as sending a link. Start a checklist and share the link with your friends on any of your favorite messaging apps."
  },
  {
    emoji: "🥳🏖",
    title: "Jump in anytime, anywhere.",
    description: "Since NMBO lives on the web, you can open a checklist from any browser on any device."
  },
  {
    emoji: "🥸",
    title: "No account needed. And it's free.",
    description: "NMBO is completely free to use. Join a checklist or create one, even if you don't have an account."
  },
  {
    emoji: "👷‍♀️👨‍🌾🧑‍🚀",
    title: "Get stuff done together.",
    description: "Invite as many people as you want to your checklist. Projects are more fun with other people."
  }
]

export default function Home() {
  const router = useRouter(); 
  const classes = useStyles(); 

  const handleSuccess = (id) => router.push(ROUTES.PROJECT(id))

  useEffect(() => {
    firebase.analytics().logEvent(EVENTS.PAGE_VIEW, {
      page_path: router.pathname,
      page_title: PAGE_TITLE.HOME,
      page_location: window.location.href
    })
  }, [])

  const Feature = (props) => {
    const { emoji, title, description} = props;

    return (
      <div className={classes.feature}>
        <Typography variant="h4">
          {emoji}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
      </div>
    )
}

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
      <Container maxWidth="md">
        <Grid container spacing={10} >
          <Grid container item xs={12} spacing={1} alignItems="flex-start">
            <Grid item>
              <Typography variant="h3" component="h1">
                NMBO is the fastest way to make a checklist with friends.
              </Typography>
            </Grid>
            <Grid item xs>
              <AddProject
                onSuccess={handleSuccess}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={4}>
            {features.map((feature, index) => (
              <Grid
                key={index}
                md={3}
                sm={6}
                xs={12}
                item
              >
                <Feature
                  emoji={feature.emoji}
                  title={feature.title}
                  description={feature.description}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </App>
  )
}
