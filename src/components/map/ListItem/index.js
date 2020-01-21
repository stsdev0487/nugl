import React, { Fragment } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'

import Rating from '../../common/Rating'
import Avatar from '../../common/Avatar'
import { isCurrentlyOpen } from '../../../util/ListingUtil'

import Content from './Content'
import CardButtons from './CardButtons'

import styles from './styles'

import Cross from '../../../static/images/nugl_cross.svg'

const SearchListing = ({
  listing,
  result,
  onClick,
  hovered,
  selected,
  classes,
}) => {
  const { type, name, ratings, hours, services } = listing
  const distance = parseFloat(result.distance[0]).toFixed(1)
  const isOpen = isCurrentlyOpen(listing)
  const actualServices =
    type === 'Retail' ? 'Retail' : services ? services.join(', ') : ''

  return (
    <Fragment>
      {listing.featured && (
        <ListItem className={classes.sponsored}>
          <Typography variant="caption" color="textSecondary">
            <a
              href="https://www.nugl.com/advertise.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa fa-info-circle"></i>
            </a>{' '}
            Sponsored Listing
          </Typography>
        </ListItem>
      )}
      <ListItem
        className={classNames(
          hovered || selected ? classes.cardHovered : classes.card,
          listing.featured ? classes.featured : null,
        )}
        onClick={onClick}
      >
        <Avatar
          source={listing.featured || true ? listing.logoUrl : Cross}
          title={name}
          className={classNames(
            classes.media,
            listing.featured ? classes.featuredMedia : null,
          )}
        />

        <div className={classes.content}>
          <div className={classes.topContent}>
            <Typography
              variant={listing.featured ? 'subtitle1' : 'subtitle1'}
              className={classes.heading}
            >
              {listing.featured ? <b>{name}</b> : name}
            </Typography>

            {type === 'Dispensary' ? (
              <Content listing={listing} />
            ) : (
              <CardButtons listing={listing} />
            )}
          </div>
          <div className={classes.middleContent}>
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.services}
            >
              {actualServices}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {distance} mi
            </Typography>
          </div>
          <div className={classes.bottomContent}>
            <Rating rating={ratings ? ratings.average : 0} />
            <Typography
              variant="body1"
              className={
                hours ? (isOpen ? classes.openGreen : null) : classes.noHours
              }
            >
              {hours ? (isOpen ? 'OPEN NOW' : 'CLOSED') : 'N/A'}
            </Typography>
          </div>
        </div>
      </ListItem>
    </Fragment>
  )
}

export default withStyles(styles)(SearchListing)
