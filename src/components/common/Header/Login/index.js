import React from 'react'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const Login = ({ handleSignUp, handleLogIn, handleToggleDrawer, classes }) => (
  <div className={classNames(classes.side, classes.flexEnd)}>
    <Button
      className={classes.signUpButton}
      onClick={handleSignUp}
      color="default"
    >
      Sign Up
    </Button>
    <Button
      className={classes.signInButton}
      onClick={handleLogIn}
      color="default"
    >
      Log In
    </Button>
    <IconButton
      className={classes.menuButton}
      color="inherit"
      aria-label="Menu"
      onClick={handleToggleDrawer(true)}
    >
      <MenuIcon />
    </IconButton>
  </div>
)

export default withStyles(styles)(Login)
