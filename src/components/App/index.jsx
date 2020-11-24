import React, { useContext } from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppStateContext } from '../AppState'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(6)
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
      <div className={classes.content}>
        <Toolbar/>
        {children}
      </div>
    </main>
  )
}

export default App
