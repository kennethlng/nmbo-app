import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import { AppStateContext } from '../AppState'
import * as STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes';
import * as SOCIAL from '../../constants/social'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useContext } from 'react'; 
import { useRouter } from 'next/router'
import LogoButton from './LogoButton'

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
        width: '75%',
        margin: 'auto',
        marginBottom: theme.spacing(3),
        paddingLeft: theme.spacing(3)
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
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button onClick={() => router.push(ROUTES.ABOUT)}>
                    <ListItemText primary="About"/>
                </ListItem>
                <ListItem button onClick={() => window.open(SOCIAL.FEEDBACK, '_blank')}>
                    <ListItemText primary="Send Feedback"/>
                </ListItem>
            </List>
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