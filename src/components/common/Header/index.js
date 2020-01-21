import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { withStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { signOut } from '../../../store/actions/userActions'
import NuglSearchBar from '../NuglSearchBar'
import NuglDrawer from '../NuglDrawer'
import Login from './Login'
import UserMenu from './UserMenu'

import Cross from '../../../static/images/nugl_cross.svg'

import styles from './styles'

class Header extends Component {
  state = {
    anchorEl: null,
    drawerOpen: false,
  }

  handleChangeTab = (event, value) => {
    this.setState({
      tabIndex: value,
    })
  }

  handleSignUp = () => {
    this.props.history.push('/sign-up')
  }

  handleLogIn = () => {
    this.props.history.push('/sign-in')
  }

  handleSignOut = () => {
    this.props.signOut()
    this.props.history.push('/')
    //window.location.reload(true);
  }

  handleToggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    })
  }

  goto = path => () => {
    this.props.history.push(path)
  }

  changeWindowLocation = url => () => {
    window.location = url
  }

  render() {
    const { handleSignUp, handleLogIn, handleToggleDrawer } = this

    const { authenticated, classes, user } = this.props
    const { drawerOpen } = this.state

    return (
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <div className={classes.side}>
            <a href="http://www.nugl.com">
              <img
                src={Cross}
                style={{ height: 24, marginTop: 5 }}
                alt="NUGL"
              />
            </a>
          </div>
          <div className={classes.searchArea}>
            <div className={classes.searchBox}>
              <NuglSearchBar />
            </div>
          </div>
          {authenticated ? (
            <UserMenu
              user={user}
              handleClick={() => this.props.history.push('/account/')}
              handleToggleDrawer={handleToggleDrawer}
            />
          ) : (
            <Login
              handleSignUp={handleSignUp}
              handleLogIn={handleLogIn}
              handleToggleDrawer={handleToggleDrawer}
            />
          )}
        </Toolbar>
        <NuglDrawer
          open={drawerOpen}
          authenticated={authenticated}
          onToggleDrawer={this.handleToggleDrawer}
          onSignIn={this.handleLogIn}
          onSignOut={this.handleSignOut}
          onLinkClicked={this.goto}
          onExternalLinkClicked={this.changeWindowLocation}
        />
      </AppBar>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    authenticated: state.user && state.user.authenticated,
  }
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      {
        signOut,
      },
    )(Header),
  ),
)
