import React from 'react'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'

import Rating from '../../common/Rating'
import Avatar from '../../common/Avatar'
import { isCurrentlyOpen } from '../../../util/ListingUtil'

import styles from './styles'

const ListingPopper = ({
  onPopoverClose,
  onNavigateToListing,
  classes,
  result: {
    listing,
    listing: { name, ratings, hours },
  },
}) => {
  const isOpen = isCurrentlyOpen(listing)
  const openedClass = hours
    ? isOpen
      ? classes.openGreen
      : classes.closedRed
    : classes.noHours
  const avatarSource = listing.logoUrl
  const openedText = hours ? (isOpen ? 'OPEN NOW' : 'CLOSED') : 'N/A'

  return (
    <ClickAwayListener onClickAway={onPopoverClose}>
      <Fade in={true}>
        <div onClick={onNavigateToListing(listing)} className={classes.root}>
          <Avatar source={avatarSource} className={classes.logo} />
          <div className={classes.title}>
            <Typography variant="body2" className={classes.name} gutterBottom>
              {name}
            </Typography>
            <div className={classes.bottom}>
              <Rating rating={ratings ? ratings.average : 0} />
              <Typography
                className={classNames(classes.ratingDescription, openedClass)}
                variant="body2"
              >
                {openedText}
              </Typography>
            </div>
          </div>
        </div>
      </Fade>
    </ClickAwayListener>
  )
}

export default withStyles(styles)(ListingPopper)
