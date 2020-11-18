import * as React from 'react'
import LogoNavBarItemButton from './LogoNavBarItemButton'
import AboutNavBarItemButton from './AboutNavBarItemButton'
import FeedbackNavBarItemButton from './FeedbackNavBarItemButton'
import AccountNavbarItemDropdown from './AccoutNavbarItemDropdown'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as STYLES from '../../constants/styles' 
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { AppStateContext } from '../AppState'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
}))

const Header = () => {
  const classes = useStyles(); 
  const router = useRouter();
  const appState = React.useContext(AppStateContext); 

  const handleDrawerToggle = () => {
    appState.setDrawerOpen(!appState.drawerOpen);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>

    // <header>
    //   <nav className="navbar is-transparent is-spaced" role="navigation" aria-label="main navigation">
    //     <div className="navbar-brand">
    //       <LogoNavBarItemButton/>

    //       <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={() => setMenuIsActive(!menuIsActive)}>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //       </a>
    //     </div>

    //     <div id="navbarBasicExample" className={`navbar-menu ${menuIsActive ? 'is-active' : ''}`} onClick={() => setMenuIsActive(false)}>
    //       <div className="navbar-start">
            
    //       </div>

    //       {router.pathname !== ROUTES.SIGN_IN && router.pathname !== ROUTES.SIGN_UP ? (
    //         <div className="navbar-end">
    //           <AboutNavBarItemButton />
    //           <FeedbackNavBarItemButton />
    //           <AccountNavbarItemDropdown />
    //         </div>
    //       ) : null}
    //     </div>
    //   </nav>
    // </header>
  )
}

export default Header
