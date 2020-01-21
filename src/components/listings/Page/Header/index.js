import React, { Fragment } from 'react'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Avatar from '../../../common/Avatar'

import styles from './styles'

const Header = ({
  classes,
  listing,
  userId,
  Button,
  handleClaimDialogOpen,
}) => (
  <div
    className={classes.banner}
    style={{
      backgroundImage: `url(${listing.bannerUrl}`,
    }}
  >
    <Fragment>
      {listing && !userId && (
        <div className={classes.claimSection}>
          <Typography
            variant="h6"
            className={classes.topBannerText}
            gutterBottom
          >
            Is this your business?
          </Typography>
          <Typography className={classes.topBannerSubText} variant="body2">
            Click here to claim your FREE listing!
          </Typography>
          <Button
            className={classes.topBannerButton}
            onClick={handleClaimDialogOpen(true)}
            variant="contained"
            small="true"
            color="secondary"
          >
            Claim this Business
          </Button>
        </div>
      )}
      <div className={classes.gradient} />
      <Avatar source={listing.logoUrl} className={classes.avatar} />
      <div className={classes.header} />
    </Fragment>
  </div>
)

export default withStyles(styles)(withWidth()(Header))
