import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppStateContext } from '../AppState'
import * as STYLES from '../../constants/styles'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { useContext } from 'react'; 
import HomeIcon from '@material-ui/icons/Home';
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes';
import RecentAuthUserProjectsSubList from '../RecentAuthUserProjectsSubList'

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: STYLES.DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: STYLES.DRAWER_WIDTH,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}))

export default function Sider() {
    const classes = useStyles(); 
    const theme = useTheme(); 
    const router = useRouter(); 
    const appState = useContext(AppStateContext);

    const list = (
        <div className={classes.drawerContainer} onClick={() => appState.setDrawerOpen(false)}>
            <List subheader={<li/>}>
                <ListItem button onClick={() => router.push(ROUTES.HOME)}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <Divider/>
                <RecentAuthUserProjectsSubList/>
            </List>
        </div>
    )

    const handleDrawerToggle = () => appState.setDrawerOpen(!appState.drawerOpen);

    return (
        <nav className={classes.drawer}>
            <Hidden smUp implementation="js">
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
                    {list}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <Toolbar/>
                    {list}
                </Drawer>
            </Hidden>
        </nav>
    )
}