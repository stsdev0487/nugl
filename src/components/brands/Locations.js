import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import GoogleMap from 'google-map-react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuIcon from '@material-ui/icons/Menu'
import MapIcon from '@material-ui/icons/Map'
import ListingCard from './ListingCard'
import Typography from '@material-ui/core/Typography'
import { renderListingTypeMarker } from '../../util/IconUtil'

const styles = theme => ({
  list: {},
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
    borderBottom: 'solid 1px',
    borderBottomColor: theme.palette.grey[100],
    fill: theme.palette.common.white,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      borderLeft: `solid 4px ${theme.palette.primary.main}`,
      backgroundColor: theme.palette.grey[50],
    },
  },
  mapContainer: {
    width: '100%',
    height: 400,
    margin: 0,
  },
})

const Marker = ({ listing }) => (
  <div>{renderListingTypeMarker(listing.type)}</div>
)

class Locations extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 'list',
    }
  }

  handleClickView = view => event => {
    this.setState({ view })
  }

  render() {
    const {
      listings,
      currentLocation,
      onSellBrandClick,
      currentUserHasLocations,
      onListingClick,
      classes,
    } = this.props
    return listings && listings.length > 0 ? (
      <List className={classes.list}>
        <ListSubheader className={classes.listHeader} disableSticky>
          <span>Store Locator</span>
          <div>
            <IconButton onClick={this.handleClickView('list')}>
              <MenuIcon
                color={this.state.view === 'list' ? 'primary' : 'inherit'}
              />
            </IconButton>
            <IconButton onClick={this.handleClickView('map')}>
              <MapIcon
                color={this.state.view === 'map' ? 'primary' : 'inherit'}
              />
            </IconButton>
          </div>
        </ListSubheader>
        {this.state.view === 'list' &&
          listings &&
          listings.map(listing => (
            <ListItem
              key={`${listing.id}-list-item`}
              className={classes.listItem}
            >
              <ListingCard listing={listing} onClick={onListingClick} />
            </ListItem>
          ))}
        {this.state.view === 'map' && listings && (
          <div className={classes.mapContainer}>
            <GoogleMap
              options={{
                panControl: false,
                mapTypeControl: false,
                scrollwheel: true,
              }}
              bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
              }}
              defaultCenter={{
                lat: currentLocation.latitude,
                lng: currentLocation.longitude,
              }}
              defaultZoom={12}
            >
              {listings.map(listing => {
                const location = listing.location
                  ? {
                      lat: listing.location.latitude,
                      lng: listing.location.longitude,
                    }
                  : null
                return (
                  <Marker
                    key={`${listing.id}-location-brand`}
                    lat={location.lat}
                    lng={location.lng}
                    listing={listing}
                  />
                )
              })}
            </GoogleMap>
          </div>
        )}
      </List>
    ) : (
      <div className={classes.noConnectionsContent}>
        <img
          src={require('../../static/images/categories/storefront.svg')} // eslint-disable-line
          style={{ height: 120, width: 120 }}
          alt="Retail"
        />
        <Typography variant="h6" className={classes.noConnectionsTitle}>
          This brand has no current locations.
        </Typography>
        {currentUserHasLocations ? (
          <Fragment>
            <Typography variant="body1" className={classes.noConnectionsLine}>
              To add your location, click the button below.
            </Typography>
            <Button
              onClick={onSellBrandClick}
              variant="outlined"
              color="primary"
            >
              Sell This Brand
            </Button>
          </Fragment>
        ) : (
          <Typography variant="body1" className={classes.noConnectionsLine}>
            To add your location, please log in and submit a request.
          </Typography>
        )}
      </div>
    )
  }
}

Locations.propTypes = {}

export default withStyles(styles, { withTheme: true })(Locations)
