import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import RetailIcon from '../../static/images/categories/storefront.svg'

import Man from '../../static/images/man-with-pink-shirt.png'

const styles = theme => ({
  tabs: {
    backgroundColor: theme.palette.common.white,
    borderTop: `solid 1px ${theme.palette.grey['200']}`,
    borderBottom: `solid 1px ${theme.palette.grey['200']}`,
  },
  avatarIcon: {
    height: 32,
    width: 32,
    borderRadius: 100,
    objectFit: 'cover',
    border: '1px solid #e6ecf0',
  },
  categoryIcon: {
    height: 32,
    width: 32,
  },
  main: {
    flexGrow: 1,
  },
  label: {
    display: 'inherit',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
})

const paths = ['/account/', '/account/profiles']

class TabMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: 0,
    }
  }

  componentWillMount() {
    const { pathname } = this.props.location
    this.setState({ tabIndex: paths.indexOf(pathname) })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({ tabIndex: paths.indexOf(nextProps.location.pathname) })
    }
  }

  handleChangeTab = (event, value) => this.props.history.push(paths[value])

  render() {
    const { classes, user } = this.props
    if (!user) return null

    return (
      <div className={classes.main}>
        <Tabs
          value={this.state.tabIndex}
          onChange={this.handleChangeTab}
          className={classes.tabs}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={<span className={classes.label}>My Account</span>}
            title="My Account"
            icon={
              user.photoURL &&
              !user.photoURL.includes('default-profile.png') ? (
                <img
                  className={classes.avatarIcon}
                  alt="Profile Avatar"
                  src={user.photoURL}
                />
              ) : (
                <img
                  src={Man}
                  alt="Profile Avatar"
                  className={classes.avatarIcon}
                />
              )
            }
          />
          <Tab
            label={<span className={classes.label}>My Profiles</span>}
            title="My Profiles"
            icon={
              <img
                className={classes.categoryIcon}
                alt="My Profiles"
                src={RetailIcon}
              />
            }
          />
        </Tabs>
      </div>
    )
  }
}

export default withStyles(styles)(
  withRouter(
    connect(state => ({
      user: state.user,
    }))(TabMenu),
  ),
)
