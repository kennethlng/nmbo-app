import React, { useContext } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { AppStateContext } from '../AppState'
import * as SNACKBAR from '../../constants/snackbar'
import Snackbar from '@material-ui/core/Snackbar'; 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SettingsDialog from '../SettingsDialog'; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(6),
    marginBottom: theme.spacing(6)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const App = ({ children }) => {
  const classes = useStyles(); 
  const appState = useContext(AppStateContext); 

  return (
    <main className={classes.root}>
      <Header />
      <Sider/>
      <Backdrop className={classes.backdrop} open={appState.routeLoading}>
        <CircularProgress/>
      </Backdrop>
      <Snackbar
        anchorOrigin={{
          vertical: SNACKBAR.VERTICAL_ANCHOR,
          horizontal: SNACKBAR.HORIZONTAL_ANCHOR
        }}
        open={appState.snackbarOpen}
        autoHideDuration={SNACKBAR.AUTO_HIDE_DURATION}
        onClose={() => appState.setSnackbarOpen(false)}
        message={appState.snackbarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" color="inherit" onClick={() => appState.setSnackbarOpen(false)}>
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
      <SettingsDialog 
        open={appState.settingsOpen}
        onClose={() => appState.setSettingsOpen(false)}
      />
      <div className={classes.content}>
        <Toolbar/>
        {children}
      </div>
    </main>
  )
}

export default App
