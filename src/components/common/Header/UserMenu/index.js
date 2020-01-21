import React from 'react'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

import Avatar from '../../../common/Avatar'

import Man from '../../../../static/images/man-with-pink-shirt.png'

import styles from './styles'

const Login = ({
  handleClick,
  user: { displayName, photoURL },
  handleToggleDrawer,
  classes,
}) => (
  <div className={classNames(classes.side, classes.flexEnd)}>
    <IconButton
      onClick={handleClick}
      color="inherit"
      className={classes.photoButton}
    >
      <Avatar
        className={classes.avatar}
        title={displayName}
        source={photoURL || Man}
      />
    </IconButton>
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
