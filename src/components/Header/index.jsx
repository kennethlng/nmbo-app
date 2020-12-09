import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import { AppStateContext } from '../AppState'
import AccountButton from './AccountButton'
import AddProjectButton from './AddProjectButton'
import LogoButton from './LogoButton'
import { useRouter } from 'next/router'
import * as ROUTES from '../../constants/routes'
import * as STYLES from '../../constants/styles'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${STYLES.DRAWER_WIDTH}px)`,
      marginLeft: STYLES.DRAWER_WIDTH,
    },
    backgroundColor: theme.palette.background.default
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  logoContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  spacer: {
    flexGrow: 1
  },
  buttons: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}))

const Header = () => {
  const classes = useStyles(); 
  const router = useRouter(); 
  const appState = React.useContext(AppStateContext); 

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
        {/* <div className={classes.logoContainer}>
          <LogoButton/> 
        </div> */}
        <div className={classes.spacer}/> 
        <div className={classes.buttons}>
          {router.pathname === ROUTES.HOME ? null : <AddProjectButton/> }
          <AccountButton />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
