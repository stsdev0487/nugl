import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import PersonIcon from '@material-ui/icons/Person'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockOutlineIcon from '@material-ui/icons/LockOutline'
import { Icon } from 'react-fa'

const styles = theme => ({
  main: {
    backgroundColor: '#111111',
  },
  list: {
    width: 300,
    color: theme.palette.common.white,
    paddingTop: 0,
  },
  listContainer: {
    paddingBottom: theme.spacing.unit * 6,
  },
  subheader: {
    color: '#959595',
  },
  closeHeader: {
    paddingRight: theme.spacing.unit,
    textAlign: 'right',
  },
  menuItem: {
    color: theme.palette.common.white,
    borderLeft: 'solid 4px transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      borderLeft: `solid 4px ${theme.palette.primary.main}`,
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
  },
  listItemText: {
    paddingLeft: 0,
    color: 'inherit',
  },
  firstItem: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  closeIcon: {
    fill: theme.palette.common.white,
  },
  icon: {
    fill: 'inherit',
  },
  faIcon: {
    width: 24,
    color: '#ffffff',
    fill: 'inherit',
    textAlign: 'center',
  },
  version: {
    color: theme.palette.primary.main,
  },
  new: {
    borderRadius: 3,
    color: theme.palette.common.white,
    display: 'inline',
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 4,
  },
})

class NuglDrawer extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  render() {
    const {
      open,
      authenticated,
      onToggleDrawer,
      onSignIn,
      onSignOut,
      onLinkClicked,
      onExternalLinkClicked,
      classes,
    } = this.props
    return (
      <Drawer
        open={open}
        anchor="right"
        onClose={onToggleDrawer(false)}
        classes={{
          paper: classes.main,
        }}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={onToggleDrawer(false)}
          onKeyDown={onToggleDrawer(false)}
          className={classes.listContainer}
        >
          <List className={classes.list}>
            <ListSubheader className={classes.closeHeader} disableSticky>
              <IconButton onClick={onToggleDrawer(false)}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </ListSubheader>
            <MenuItem
              className={classNames(classes.menuItem, classes.firstItem)}
              onClick={onExternalLinkClicked('http://www.nugl.com')}
            >
              <ListItemIcon>
                <img
                  src={require('../../static/images/ic-brand.svg')} // eslint-disable-line
                  style={{ height: 24, width: 24 }}
                  alt="NUGL"
                />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Home"
                disableTypography
              />
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={onLinkClicked('/')}>
              <ListItemIcon>
                <SearchIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Search NUGL"
                disableTypography
              />
            </MenuItem>
            {!authenticated && (
              <MenuItem
                className={classes.menuItem}
                onClick={onLinkClicked('/sign-up')}
              >
                <ListItemIcon>
                  <PersonIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Sign Up"
                  disableTypography
                />
              </MenuItem>
            )}
            {authenticated && (
              <MenuItem
                className={classes.menuItem}
                onClick={onLinkClicked('/account/')}
              >
                <ListItemIcon>
                  <AccountBoxIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Account"
                  disableTypography
                />
              </MenuItem>
            )}
            {!authenticated && (
              <MenuItem className={classes.menuItem} onClick={onSignIn}>
                <ListItemIcon>
                  <LockOpenIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Log In"
                  disableTypography
                />
              </MenuItem>
            )}
            {authenticated && (
              <MenuItem className={classes.menuItem} onClick={onSignOut}>
                <ListItemIcon>
                  <LockOutlineIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText
                  className={classes.listItemText}
                  primary="Log Out"
                  disableTypography
                />
              </MenuItem>
            )}
            <ListSubheader className={classes.subheader} disableSticky>
              GET THE APP <span className={classes.new}>NEW</span>
            </ListSubheader>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked(
                'https://play.google.com/store/apps/details?id=com.goboxy.nugl',
              )}
            >
              <ListItemIcon>
                <Icon name="android" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Download for Android"
                disableTypography
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked(
                'https://itunes.apple.com/us/app/nugl-cannabis-technology/id1399024669?ls=1&mt=8',
              )}
            >
              <ListItemIcon>
                <Icon name="apple" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Download for iOS"
                disableTypography
              />
            </MenuItem>
            <ListSubheader className={classes.subheader} disableSticky>
              ABOUT US
            </ListSubheader>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked('http://www.nugl.com/about.html')}
            >
              Who We Are
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked(
                'http://www.nugl.com/about.html#team',
              )}
            >
              Meet Our Team
            </MenuItem>
            <MenuItem
              className={classNames(classes.menuItem, classes.firstItem)}
              onClick={onExternalLinkClicked(
                'http://www.nugl.com/advertise.html',
              )}
            >
              Advertising with NUGL
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked('http://www.nugl.com/invest.html')}
            >
              Investment Opportunities
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked('http://www.nugl.com/press.html')}
            >
              Latest News
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked('https://nuglmagazine.com/')}
            >
              NUGL Magazine
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked(
                'http://www.nugl.com/contact.html',
              )}
            >
              Contact Us
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked(
                'http://www.nugl.com/about.html#release_updates',
              )}
            >
              Release Notes
            </MenuItem>
            <ListSubheader className={classes.subheader} disableSticky>
              CONNECT WITH US
            </ListSubheader>
            <MenuItem
              className={classNames(classes.menuItem, classes.firstItem)}
              onClick={onExternalLinkClicked(
                'https://www.facebook.com/nuglapp/',
              )}
            >
              <ListItemIcon>
                <Icon name="facebook" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Facebook"
                disableTypography
              />
            </MenuItem>
            <MenuItem
              className={classes.menuItem}
              onClick={onExternalLinkClicked('https://twitter.com/nuglapp')}
            >
              <ListItemIcon>
                <Icon name="twitter" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Twitter"
                disableTypography
              />
            </MenuItem>
            <MenuItem
              className={classNames(classes.menuItem, classes.firstItem)}
              onClick={onExternalLinkClicked(
                'https://www.instagram.com/justnuglit/',
              )}
            >
              <ListItemIcon>
                <Icon name="instagram" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Instagram"
                disableTypography
              />
            </MenuItem>
            <MenuItem
              className={classNames(classes.menuItem, classes.firstItem)}
              onClick={onExternalLinkClicked(
                'https://www.linkedin.com/company/nuglapp/',
              )}
            >
              <ListItemIcon>
                <Icon name="linkedin" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="LinkedIn"
                disableTypography
              />
            </MenuItem>
            <MenuItem
              className={classNames(classes.menuItem, classes.firstItem)}
              onClick={onExternalLinkClicked('http://eepurl.com/dtB2kn')}
            >
              <ListItemIcon>
                <Icon name="envelope" className={classes.faIcon} />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary="Join Our Newsletter"
                disableTypography
              />
            </MenuItem>
            <ListSubheader className={classes.subheader} disableSticky>
              2018 &copy; NUGL inc.
            </ListSubheader>
          </List>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NuglDrawer)
