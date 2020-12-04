import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { AppStateContext } from '../AppState'
import * as STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes';
import * as SOCIAL from '../../constants/social'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FeedbackRoundedIcon from '@material-ui/icons/FeedbackRounded';
import { useContext } from 'react'; 
import { useRouter } from 'next/router'
import LogoButton from './LogoButton'
import EmailListItem from '../EmailListItem'
import RecentAuthUserProjects from '../RecentAuthUserProjects'
import Footer from '../Footer'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: STYLES.DRAWER_WIDTH,
        paddingTop: theme.spacing(3)
    },
    drawerContainer: {
        overflow: 'auto'
    },
    margin: {
        margin: theme.spacing(2)
    },
    logo: {
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        },
        margin: 'auto',
        textAlign: 'center',
        marginBottom: theme.spacing(3)
    },
    footer: {
        padding: theme.spacing(2),
        // marginTop: theme.spacing(6)
    }
}))

export default function Sider() {
    const classes = useStyles(); 
    const router = useRouter(); 
    const appState = useContext(AppStateContext);

    const drawer = (
        <div className={classes.drawerContainer} onClick={() => appState.setDrawerOpen(false)}>
            <div className={classes.logo}>
                <LogoButton/>
            </div>
            <List subheader={<li/>}>
                <ListItem button onClick={() => router.push(ROUTES.HOME)}>
                    <ListItemIcon>
                        <HomeRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <RecentAuthUserProjects/>
                <ListItem button onClick={() => window.open(SOCIAL.FEEDBACK, '_blank')}>
                    <ListItemIcon>
                        <FeedbackRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Send Feedback"/>
                </ListItem>
                <EmailListItem/>
            </List>
            <Divider variant="middle"/>
            <div className={classes.footer}>
                <Footer/>
            </div>
        </div>
    )

    const handleDrawerToggle = () => appState.setDrawerOpen(!appState.drawerOpen);

    return (
        <Drawer
            anchor='left'
            open={appState.drawerOpen}
            onClose={handleDrawerToggle}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            {drawer}
        </Drawer>
    )
}