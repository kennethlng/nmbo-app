import * as React from 'react'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { AppStateContext } from '../AppState'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'
import AccountButton from './AccountButton'
import { AuthUserContext } from '../Session'
import Logo from '../Logo'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  logo: {
    height: 35,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  spacer: {
    flexGrow: 1
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}))

const Header = () => {
  const classes = useStyles(); 
  const router = useRouter(); 
  const appState = React.useContext(AppStateContext); 
  const authUser = React.useContext(AuthUserContext); 

  const handleDrawerToggle = () => {
    appState.setDrawerOpen(!appState.drawerOpen);
  };

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit" elevation={0}>
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
        <a href="" className={classes.logo}>
          <Logo/>
        </a>
        <div className={classes.spacer}/>
        {authUser && authUser.isAnonymous ? (
          <div className={classes.buttons}>
            <SignUpButton/>
            <SignInButton/>
          </div>
        ) : <AccountButton/>}
      </Toolbar>
    </AppBar>
  )
}

export default Header
