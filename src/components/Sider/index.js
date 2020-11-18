import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppStateContext } from '../AppState'
import * as STYLES from '../../constants/styles'
import * as ROUTES from '../../constants/routes';
import * as SOCIAL from '../../constants/social'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CreateIcon from '@material-ui/icons/Create';
import { useContext } from 'react'; 
import { useRouter } from 'next/router'
import RecentAuthUserProjectsSubList from '../RecentAuthUserProjectsSubList'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: STYLES.DRAWER_WIDTH,
            flexShrink: 0,
        }
    },
    drawerPaper: {
        width: STYLES.DRAWER_WIDTH,
        paddingTop: theme.spacing(3)
    },
    drawerContainer: {
        overflow: 'auto'
    },
    margin: {
        margin: theme.spacing(2)
    }
}))

export default function Sider() {
    const classes = useStyles(); 
    const theme = useTheme(); 
    const router = useRouter(); 
    const appState = useContext(AppStateContext);

    const drawer = (
        <div className={classes.drawerContainer} onClick={() => appState.setDrawerOpen(false)}>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => router.push(ROUTES.HOME)}
                disableElevation
                disableRipple
                className={classes.margin}
                startIcon={<CreateIcon/>}
            >
                New Checklist
            </Button>
            <List subheader={<li/>}>
                <RecentAuthUserProjectsSubList/>
                <Divider/>
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
                    {drawer}
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
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}