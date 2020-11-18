import React from 'react'
import Header from '../Header'
import Sider from '../Sider'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(6)
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
        <Container maxWidth="sm">
          {children}
        </Container>
      </div>
    </main>
  )
}

export default App
