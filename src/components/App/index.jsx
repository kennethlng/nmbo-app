import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const App = ({ children }) => {
  const classes = useStyles(); 

  return (
    <main className={classes.root}>
      <Header />
      <Sider/>
      <div className={classes.content}>
        <div className={classes.toolbar}/>
        {children}
      </div>
    </main>
  )
}

export default App
