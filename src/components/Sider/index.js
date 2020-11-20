import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppStateContext } from '../AppState'
import * as STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes';
import * as SOCIAL from '../../constants/social'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useContext } from 'react'; 
import { useRouter } from 'next/router'
import Logo from '../Logo'

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
        width: '75%',
        margin: 'auto',
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2)
    }
}))

export default function Sider() {
    const classes = useStyles(); 
    const theme = useTheme(); 
    const router = useRouter(); 
    const appState = useContext(AppStateContext);

    const drawer = (
        <div className={classes.drawerContainer} onClick={() => appState.setDrawerOpen(false)}>
            <div className={classes.logo}>
                <Logo/>
            </div>
            <List subheader={<li/>}>
                {/* <RecentAuthUserProjectsSubList/> */}
                <Divider/>
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