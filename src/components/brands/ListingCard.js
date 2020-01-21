import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Imgix from 'react-imgix'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Rating from '../common/Rating'
import { renderListingTypeIcon, getNuglIcon } from '../../util/IconUtil'
import { isCurrentlyOpen } from '../../util/ListingUtil'
import { basePhotoUrl } from '../../const/Paths'

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  logo: {
    borderRadius: '50%',
    height: 90,
    width: 90,
    marginRight: theme.spacing.unit * 3,
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    position: 'relative',
    display: 'flex',
    width: 'calc(100% - 114px)',
    flexShrink: 0,
    flexDirection: 'column',
  },
  topContent: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  middleContent: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    display: 'flex',
    alignItems: 'center',
  },
  headingContainer: {},
  heading: {
    maxWidth: 'calc(100% - 64px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  services: {
    maxWidth: 'calc(100% - 64px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  cardButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
    height: 90,
    width: 90,
    margin: 15,
    marginRight: 0,
    display: 'flex',
    flexShrink: 0,
  },
  cardButton: {
    width: 24,
    height: 24,
    marginLeft: theme.spacing.unit,
  },
  openGreen: {
    color: theme.palette.tertiary.dark,
  },
  closedRed: {
    color: theme.palette.secondary.dark,
  },
  noHours: {
    color: '#d0d0d0;',
  },
})

const ListingCard = ({ listing, onClick, classes }) => {
  const distance = listing.distance
  const isOpen = isCurrentlyOpen(listing)
  const services =
    listing.type === 'Retail' ? 'Retail' : listing.services.join(', ')
  return (
    <div className={classes.card} onClick={onClick(listing.id)}>
      <Imgix className={classes.logo} src={listing.logoUrl} type="bg" />
      <div className={classes.content}>
        <div className={classes.topContent}>
          <Typography variant="subtitle1" className={classes.heading}>
            {listing.name}
          </Typography>

          {listing.type === 'Retail' ? (
            <div className={classes.cardButtons}>
              <Tooltip
                id="tooltip-dispensary"
                title="Dispensary"
                placement="bottom"
              >
                <IconButton className={classes.cardButton}>
                  {renderListingTypeIcon(listing.type)}
                </IconButton>
              </Tooltip>
              {listing.services && listing.services.indexOf('Delivery') >= 0 && (
                <Tooltip
                  id="tooltip-delivery"
                  title="Delivery"
                  placement="bottom"
                >
                  <IconButton className={classes.cardButton}>
                    {getNuglIcon('Delivery')}
                  </IconButton>
                </Tooltip>
              )}
              {listing.services &&
                listing.services.indexOf('Store Front') >= 0 && (
                  <Tooltip
                    id="tooltip-store-front"
                    title="Store Front"
                    placement="bottom"
                  >
                    <IconButton className={classes.cardButton}>
                      {getNuglIcon('Store Front')}
                    </IconButton>
                  </Tooltip>
                )}
            </div>
          ) : (
            <div className={classes.cardButtons}>
              <Tooltip id="tooltip-service" title="Service" placement="bottom">
                <IconButton className={classes.cardButton}>
                  {renderListingTypeIcon(listing.type)}
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
        <div className={classes.middleContent}>
          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.services}
          >
            {services}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {distance} mi
          </Typography>
        </div>
        <div className={classes.bottomContent}>
          <Rating rating={listing.ratings ? listing.ratings.average : 0} />
          <Typography
            variant="body2"
            className={
              listing.hours
                ? isOpen
                  ? classes.openGreen
                  : null
                : classes.noHours
            }
          >
            {listing.hours ? (isOpen ? 'OPEN NOW' : 'CLOSED NOW') : 'N/A'}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(ListingCard)
