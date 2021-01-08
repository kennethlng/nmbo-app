import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import PrivacyPolicyLink from './PrivacyLink'
import ContactLink from './ContactLink'
import FeedbackLink from './FeedbackLink'
import AboutLink from './AboutLink'

const useStyles = makeStyles(theme => ({
    links: {
        '& > * + *': {
            marginLeft: theme.spacing(1),
        },
    },
}))

export default function Footer() {
    const classes = useStyles(); 

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.links} paragraph>
                    {/* <AboutLink/> */}
                    <FeedbackLink/>
                    <ContactLink/>
                    <PrivacyPolicyLink/>
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="caption" paragraph>
                    © Copyright NMBO 2020
                </Typography>
            </Grid>
        </Grid>
    )
}