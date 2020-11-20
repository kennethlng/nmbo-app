import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { AppStateContext } from '../AppState'
import SignInButton from './SignInButton'
import SignUpButton from './SignUpButton'
import AccountButton from './AccountButton'
import AddProjectButton from './AddProjectButton'
import { AuthUserContext } from '../Session'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  const appState = React.useContext(AppStateContext); 
  const authUser = React.useContext(AuthUserContext); 

  return (
    <AppBar position="fixed" className={classes.appBar} color="inherit" elevation={0}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => appState.setDrawerOpen(!appState.drawerOpen)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.spacer}/>
        <AddProjectButton/>
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
