import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
        <Toolbar/>
        {children}
      </div>
    </main>
  )
}

export default App
