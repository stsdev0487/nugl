import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '../common/ReversedListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'
import Rating from '../common/Rating'

import defaultPhotoUrl from '../../static/images/man-with-pink-shirt.png'

const styles = theme => ({
  list: {
    padding: 0,
  },
  listHeader: {
    backgroundColor: theme.palette.grey[50],
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0,0,0,0.13)',
    borderTop: '1px solid rgba(0,0,0,0.13)',
  },
  listItem: {
    color: theme.palette.common.white,
    borderLeft: 'solid 4px transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
    paddingLeft: 80,
  },
  container: {
    borderBottom: `solid 1px ${theme.palette.grey[200]}`,
    marginBottom: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  lastReview: {
    borderBottom: 'none',
    marginBottom: 0,
    paddingBottom: 0,
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratings: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  ratingSummary: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  ratingLabel: {
    height: 22,
    marginTop: 2,
    marginRight: theme.spacing.unit,
  },
  dateLabel: {
    fontWeight: 400,
  },
  title: {
    fontWeight: 600,
  },
  comments: {
    marginTop: theme.spacing.unit,
  },
  noReviewsContent: {
    textAlign: 'center',
    padding: theme.spacing.unit * 8,
  },
  noReviewsTitle: {
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  noReviewsLine: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  userAvatar: {
    border: '1px solid #d9d9d9',
  },
})

class Reviews extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      panels: {},
    }
  }

  handleClick = id => () => {
    let panels = { ...this.state.panels }
    panels[id] = !(panels[id] || false)
    this.setState({ panels })
  }

  render() {
    const { brand, reviews, onLeaveReviewClick, user, classes } = this.props

    return reviews.length > 0 ? (
      <List className={classes.list}>
        {reviews.map((review, index) => {
          return (
            <Fragment key={review.id}>
              <ListSubheader className={classes.listHeader} disableSticky>
                <span>By {review.userDisplayName || 'Anonymous'}</span>
                <span className={classes.dateLabel}>
                  {moment(review.createdOn.toDate()).fromNow()}
                </span>
              </ListSubheader>

              <ListItem button onClick={this.handleClick(review.id)}>
                <Avatar
                  className={classes.userAvatar}
                  alt={review.userDisplayName || 'Anonymous'}
                  src={review.userPhotoUrl || defaultPhotoUrl}
                />
                <ListItemText
                  primary={
                    <div className={classes.ratingSummary}>
                      <Typography
                        className={classes.ratingLabel}
                        variant="body2"
                      >
                        {review.rating.toFixed(1)}
                      </Typography>
                      <Rating rating={review.rating} />
                    </div>
                  }
                />
              </ListItem>

              <ListItem className={classes.listItem}>
                <ListItemText primary={review.comments} />
              </ListItem>
            </Fragment>
          )
        })}
      </List>
    ) : (
      <div className={classes.noReviewsContent}>
        <Rating rating={brand.ratings ? brand.ratings.average : 0} />
        <Typography variant="h6" className={classes.noReviewsTitle}>
          There are no reviews yet.
        </Typography>
        <Typography variant="body1" className={classes.noReviewsLine}>
          Be the first to review <strong>{brand.name}</strong>.
        </Typography>
        {user ? (
          <Button
            variant="outlined"
            small="true"
            color="primary"
            onClick={onLeaveReviewClick}
          >
            Leave Review
          </Button>
        ) : (
          <Typography variant="caption" className={classes.noReviewsTitle}>
            You must be logged in to leave a review.
          </Typography>
        )}
      </div>
    )
  }
}

Reviews.propTypes = {}

export default withStyles(styles, { withTheme: true })(Reviews)
