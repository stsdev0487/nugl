import React, { Component } from 'react'
import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Rating from '../../../common/Rating'
import { renderListingTypeIcon } from '../../../../util/IconUtil'

import styles from './styles'

class Title extends Component {
  render() {
    const {
      classes,
      type,
      name,
      average,
      count,
      servicesString,
      listing,
      userId,
      handleClaimDialogOpen,
      user,
      handleReviewDialogOpen,
    } = this.props
    console.log(type)
    return (
      <div className={classes.title}>
        <div className={classes.titleTypeContainer}>
          <Typography
            className={classes.listingNameTitle}
            variant="h6"
            gutterBottom
          >
            <span className={classes.serviceIconSpan}>
              {renderListingTypeIcon(type)}
            </span>
            {name}
          </Typography>

          <div className={classes.titleLineTwo}>
            <div className={classes.ratingContainer}>
              <Rating rating={average || 0} />
              <Typography variant="caption" className={classes.ratingText}>
                {average ? `(${count})` : '(0)'}
              </Typography>
            </div>

            <Typography
              variant="subtitle1"
              className={classes.listingTypeHeading}
            >
              {servicesString}
            </Typography>
          </div>
        </div>
        <div className={classes.buttonActions}>
          {listing && !userId && (
            <Button
              className={classes.bottomClaimButton}
              onClick={handleClaimDialogOpen(true)}
              variant="contained"
              small="true"
              color="secondary"
            >
              Claim this Business
            </Button>
          )}

          {user && type === 'Retail' && (
            <Button
              className={classes.reviewButton}
              onClick={handleReviewDialogOpen(true)}
              variant="outlined"
              small="true"
              color="primary"
            >
              Leave Review
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(withWidth()(Title))
