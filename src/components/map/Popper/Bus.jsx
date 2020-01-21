import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'

import styles from './styles'

const ListingPopper = ({ onPopoverClose, classes }) => (
  <ClickAwayListener onClickAway={onPopoverClose}>
    <Fade in>
      <div className={classes.root}>
        {/* <Avatar source={avatarSource} className={classes.logo} /> */}
        <div className={classes.title}>
          <Typography variant="body2" className={classes.name} gutterBottom>
            Nugl Bus
          </Typography>
          <div className={classes.bottom}>
            <Typography
              // className={classNames(classes.ratingDescription, openedClass)}
              variant="body2"
            >
              It's the Bus Shack
            </Typography>
          </div>
        </div>
      </div>
    </Fade>
  </ClickAwayListener>
)

export default withStyles(styles)(ListingPopper)
