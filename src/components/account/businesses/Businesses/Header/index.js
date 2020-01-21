import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import Categories, { getType } from '../../../../../const/BusinessTypes'

import DropDownIcon from '@material-ui/icons/ArrowDropDown'
import BrandIcon from '../../../../../static/images/categories/brand.svg'
import RetailIcon from '../../../../../static/images/categories/storefront.svg'
import ServiceIcon from '../../../../../static/images/categories/service.svg'
import InfluencerIcon from '../../../../../static/images/categories/influencer.svg'
import PersonalIcon from '../../../../../static/images/categories/personal.svg'

import styles from './styles'

const IconMap = {
  'Retail Stores': RetailIcon,
  Services: ServiceIcon,
  Brands: BrandIcon,
  Influencers: InfluencerIcon,
  Personal: PersonalIcon,
}

class BusinessesHeader extends React.Component {
  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const {
      classes,
      selectedBusiness,
      children,
      title,
      onContextSwitch,
    } = this.props
    const { open } = this.state

    return (
      <div className={classes.header}>
        <div className={classes.bar}>
          <Typography className={classes.title} variant="h6">
            <div className={classes.selectedMenu}>
              <span className={classes.titleText}>
                {selectedBusiness ? selectedBusiness.name : 'My Profiles'}
              </span>
            </div>
          </Typography>
          {!selectedBusiness && (
            <div>
              <Button
                buttonRef={node => {
                  this.anchorEl = node
                }}
                aria-owns={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                <img
                  src={IconMap[title]}
                  alt={title}
                  style={{ height: 24, width: 24, marginRight: 16 }}
                />
                Showing my {title}
                <DropDownIcon className={classes.rightIcon} />
              </Button>
              <Popper
                style={{ zIndex: 999 }}
                open={open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          <MenuItem
                            onClick={() => onContextSwitch(Categories.BRAND)}
                          >
                            <img
                              src={BrandIcon}
                              alt={title}
                              style={{
                                height: 24,
                                width: 24,
                                marginRight: 16,
                              }}
                            />
                            {getType(Categories.BRAND).title}
                          </MenuItem>
                          <MenuItem
                            onClick={() => onContextSwitch(Categories.RETAIL)}
                          >
                            <img
                              src={RetailIcon}
                              alt={title}
                              style={{
                                height: 24,
                                width: 24,
                                marginRight: 16,
                              }}
                            />
                            {getType(Categories.RETAIL).title}
                          </MenuItem>
                          <MenuItem
                            onClick={() => onContextSwitch(Categories.SERVICE)}
                          >
                            <img
                              src={ServiceIcon}
                              alt={title}
                              style={{
                                height: 24,
                                width: 24,
                                marginRight: 16,
                              }}
                            />
                            {getType(Categories.SERVICE).title}
                          </MenuItem>
                          <MenuItem
                            onClick={() =>
                              onContextSwitch(Categories.INFLUENCER)
                            }
                          >
                            <img
                              src={PersonalIcon}
                              alt={title}
                              style={{
                                height: 24,
                                width: 24,
                                marginRight: 16,
                              }}
                            />
                            {getType(Categories.INFLUENCER).title}
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
        </div>
        <div className={classes.headerUI}>{children}</div>
      </div>
    )
  }
}

export default withStyles(styles)(BusinessesHeader)
