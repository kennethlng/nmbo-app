import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppStateContext } from '../AppState'
import * as STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Icon from '@material-ui/core/Icon';
import { useContext, useState } from 'react'; 
import { useRouter } from 'next/router'
import RecentAuthUserProjects from '../RecentAuthUserProjects'
import Footer from '../Footer'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden';
import Logo from '../Logo';
import Collapse from '@material-ui/core/Collapse'; 
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'; 
import Typography from '@material-ui/core/Typography'; 

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: STYLES.DRAWER_WIDTH,
        paddingTop: theme.spacing(3)
    },
    drawerContainer: {
        overflow: 'auto'
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: STYLES.DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    margin: {
        margin: theme.spacing(2)
    },
    logo: {
        // [theme.breakpoints.up('md')]: {
        //     display: 'none'
        // },
        height: '35px',
        width: '100%',
        margin: 'auto',
        // textAlign: 'center',
        marginBottom: theme.spacing(3),
        paddingLeft: theme.spacing(2)
    },
    footer: {
        padding: theme.spacing(2)
    }
}))

export default function Sider() {
    const classes = useStyles(); 
    const router = useRouter(); 
    const theme = useTheme(); 
    const appState = useContext(AppStateContext);
    const [recentListOpen, setRecentListOpen] = useState(true); 

    const drawer = (
        <div className={classes.drawerContainer} onClick={() => appState.setDrawerOpen(false)}>
            <div className={classes.logo}>
                <Logo/>
            </div>
            <List>
                <ListItem button onClick={() => router.push(ROUTES.HOME)}>
                    <ListItemIcon>
                        <Icon className="fas fa-home" fontSize="default"/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button onClick={() => setRecentListOpen(!recentListOpen)}>
                    <ListItemIcon>
                        <Icon className="far fa-clock" fontSize="default"/>
                    </ListItemIcon>
                    <ListItemText primary="Recent"/>
                    {recentListOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={recentListOpen} timeout="auto" unmountOnExit>
                    <RecentAuthUserProjects/>
                    <ListItem button onClick={() => router.push(ROUTES.PROJECTS)}>
                        <ListItemText 
                            primary={
                                <Typography variant="body2" color="primary">
                                    <strong>See all checklists</strong>
                                </Typography>
                            } 
                        />
                    </ListItem>
                </Collapse>
            </List>
            <Divider variant="middle"/>
            <div className={classes.footer}>
                <Footer/>
            </div>
        </div>
    )

    const handleDrawerToggle = () => appState.setDrawerOpen(!appState.drawerOpen);

    return (
        <nav className={classes.drawer}>
            <Hidden mdUp implementation="js">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={appState.drawerOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="js">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}