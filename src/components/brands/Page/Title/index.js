import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Rating from '../../../common/Rating'

import styles from './styles'

const Title = ({
  classes,
  brand: { name, ratings = {} },
  handleReviewDialogOpen,
  user,
}) => {
  const { average, count } = ratings

  const displayAverage = ratings && count ? `(${count})` : '(0)'
  const displayCount = ratings && average ? average : 0

  return (
    <div className={classes.title}>
      <div className={classes.titleTypeContainer}>
        <Typography
          className={classes.brandNameTitle}
          variant="h6"
          gutterBottom
        >
          {name}
        </Typography>

        <div className={classes.titleLineTwo}>
          <div className={classes.ratingContainer}>
            <Rating rating={displayCount} />
            <Typography variant="caption" className={classes.ratingText}>
              {displayAverage}
            </Typography>
          </div>
        </div>
      </div>
      <div className={classes.buttonActions}>
        {user && (
          <Button
            onClick={handleReviewDialogOpen}
            className={classes.sellButton}
            variant="outlined"
            small="true"
            color="primary"
          >
            Write a Review
          </Button>
        )}
      </div>
    </div>
  )
}

export default withStyles(styles)(Title)
