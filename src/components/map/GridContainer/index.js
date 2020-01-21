import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import memoize from 'memoize-one'

import {
  withStyles,
  IconButton,
  Badge,
  Button,
  List,
  ListSubheader,
  MenuItem,
  TextField,
  Zoom,
  Paper,
  Typography,
} from '@material-ui/core'

import {
  NavigateNext,
  NavigateBefore,
  FilterList,
  Close,
} from '@material-ui/icons'

import { firestore } from '../../../firebase'

import { clearSearch } from '../../../store/actions/mapActions'

import FilterDrawer from '../FilterDrawer'
import LoadingIndicator from '../../common/LoadingIndicator'
import Map from '../Map'
import ListItem from '../ListItem'
import Marker from '../Marker'
import BusMarker from '../Marker/Bus'
import NoResults from './NoResults'

import styles from './styles'

// const IS_PROD = process.env.REACT_APP_ENV === 'production';

class GridContainer extends React.Component {
  filter = memoize((list, filterText) =>
    list.filter(item => {
      if (!filterText || filterText === '') return true
      const lower = filterText.toLowerCase()
      if (item.id.toLowerCase().includes(lower)) return true
      if (item.listing.name && item.listing.name.toLowerCase().includes(lower))
        return true
      if (item.listing.city && item.listing.city.toLowerCase().includes(lower))
        return true
      if (
        item.listing.description &&
        item.listing.description.toLowerCase().includes(lower)
      )
        return true
      if (item.listing.url && item.listing.url.toLowerCase().includes(lower))
        return true
      if (
        item.listing.services &&
        item.listing.services.some(l => l.toLowerCase().includes(lower))
      )
        return true
      if (
        item.listing.channels &&
        item.listing.channels.some(l => l.toLowerCase().includes(lower))
      )
        return true

      return false
    }),
  )

  constructor(props) {
    super(props)
    this.state = {
      bus: {
        _lat: '0',
        _long: '0',
      },
    }
  }

  componentDidMount() {
    this.unsubBus = this.subBus()
  }

  subBus = () =>
    firestore.doc('flights/bus').onSnapshot(bus => {
      this.setState({ bus: bus.data().location })
    })

  showingResultsString = () => {
    const { searchPage, results } = this.props
    return `${1 + results.length * searchPage}-${results.length +
      results.length * searchPage}`
  }

  renderListingsAd = () => {
    const { classes, ads } = this.props
    return (
      <ListSubheader disableSticky className={classes.leaderboardAdSubheader}>
        <Zoom in>
          <div className={classes.leaderboardAd}>
            {ads.listingLeaderBoard && (
              <a
                className={classes.leaderboardAdLink}
                href={ads.listingLeaderBoard.clickUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ads.listingLeaderBoard.imageUrl}
                  alt={ads.listingLeaderBoard.metadata.title}
                  className={classes.leaderboardAdImage}
                />
              </a>
            )}
          </div>
        </Zoom>
      </ListSubheader>
    )
  }

  renderMapAd = () => {
    const { ads, classes, onCloseBlockAd } = this.props
    return (
      <Zoom in>
        <Paper elevation={2} className={classes.mapAd}>
          <Button
            variant="text"
            mini
            aria-label="Add"
            onClick={onCloseBlockAd}
            className={classes.closeBlockButton}
          >
            <i class="fa fa-times"></i>
          </Button>
          <a
            href={ads.mapBlock.clickUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={ads.mapBlock.imageUrl}
              alt={ads.mapBlock.metadata.title}
              width="150"
              height="125"
            />
          </a>
        </Paper>
      </Zoom>
    )
  }

  renderResults = results => {
    const {
      ads,
      classes,
      resultsPerPage,
      onResultsPerPageChange,
      searchPage,
      onMarkerMouseEnter,
      onMarkerMouseLeave,
      onListingClick,
      selectedResult,
      onBackPageClick,
      onNextPageClick,
      onToggleFilterDrawer,
      hoveredResultId,
      searchText,
      hasFilters,
      filterCount,
    } = this.props

    const { listingLeaderBoard } = ads

    const resultsSorted = results
      .sort((l, r) => l.distance > r.distance)
      .sort((l, r) => {
        const a = l.listing.featured ? 1 : 0
        const b = r.listing.featured ? 1 : 0
        return b - a
      })

    return (
      <List className={classes.list}>
        <ListSubheader className={classes.listSubheader}>
          <div className={classes.pagingContainer}>
            <Typography variant="caption" className={classes.heading}>
              Hits per page:
            </Typography>
            <TextField
              id="resultsPerPage"
              select
              className={classes.resultsPerPage}
              value={resultsPerPage}
              onChange={onResultsPerPageChange}
            >
              <MenuItem key={20} value={20}>
                20
              </MenuItem>
              <MenuItem key={50} value={50}>
                50
              </MenuItem>
              <MenuItem key={100} value={100}>
                100
              </MenuItem>
            </TextField>
            <Typography variant="caption" className={classes.heading}>
              {this.showingResultsString()}
            </Typography>
            <div>
              <IconButton
                className={classes.pageButton}
                disabled={searchPage === 0}
                onClick={onBackPageClick}
              >
                <NavigateBefore />
              </IconButton>
              <IconButton
                className={classes.pageButton}
                onClick={onNextPageClick}
                disabled={results.length < 21}
              >
                <NavigateNext />
              </IconButton>
            </div>
          </div>
          <Button
            variant={hasFilters ? 'contained' : 'outlined'}
            color="primary"
            onClick={onToggleFilterDrawer(true)}
            className={classes.filterButton}
          >
            {hasFilters ? 'Filtering' : 'Filters'}

            <Badge
              color="secondary"
              badgeContent={filterCount}
              invisible={!hasFilters}
            >
              <FilterList className={classes.rightIcon} />
            </Badge>
          </Button>
        </ListSubheader>
        {resultsSorted.map((result, index) => (
          <Fragment key={`listitem-fragment-${result.id}`}>
            {index === 0 && listingLeaderBoard && this.renderListingsAd()}
            <ListItem
              key={result.id}
              listing={result.listing}
              result={result}
              onMouseEnter={() => onMarkerMouseEnter(result.id)}
              onMouseLeave={() => onMarkerMouseLeave(result.id)}
              hovered={hoveredResultId === result.id}
              selected={Boolean(
                selectedResult && selectedResult.id === result.id,
              )}
              onClick={onListingClick(result)}
            />
          </Fragment>
        ))}
        {searchText && this.renderClearTextOption()}
      </List>
    )
  }

  renderClearTextOption = () => {
    const {
      classes,
      clearSearch: clear,
      searchText,
      onToggleFilterDrawer,
    } = this.props
    return (
      <ListSubheader disableSticky={false} className={classes.listSubheader}>
        <Button variant="outlined" color="primary" onClick={clear}>
          Don't filter for "{searchText}"
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={onToggleFilterDrawer(true)}
        >
          <Close className={classes.leftIcon} />
          Change Filters
        </Button>
      </ListSubheader>
    )
  }

  render() {
    const {
      map,
      ads: { mapBlock },
      currentLocation,
      selectedResult,
      hoveredResultId,
      defaultCenter,
      onMarkerMouseEnter,
      onMarkerMouseLeave,
      onBoundsChange,
      onMarkerClick,
      onPopoverClose,
      onNavigateToListing,
      onToggleFilterDrawer,
      updateFilter,
      filtersOpen,
      amenities,
      classes,
      results: propResults,
      searchText,
      clearSearch: clear,
    } = this.props

    const results = this.filter(propResults, searchText)

    if (!currentLocation) {
      return (
        <div className={classes.main}>
          <LoadingIndicator />
        </div>
      )
    }

    return (
      <div className={classes.main}>
        <div className={classes.grid}>
          <div className={classes.left}>
            {results.length > 0 ? (
              this.renderResults(results)
            ) : (
              <NoResults
                onOpenFilterClick={onToggleFilterDrawer(true)}
                clearSearch={clear}
              />
            )}
            <FilterDrawer
              open={filtersOpen}
              updateFilter={updateFilter}
              onToggleDrawer={onToggleFilterDrawer}
              amenityOptions={amenities}
            />
          </div>
          <div className={classes.right}>
            <div className={classes.insetShadow} />
            {mapBlock && this.renderMapAd()}
            <Map
              center={map.center}
              defaultCenter={defaultCenter}
              onBoundsChange={onBoundsChange}
              markers={results}
              hoveredResultId={hoveredResultId}
              selectedResult={selectedResult}
              onMarkerClick={onMarkerClick}
              onMarkerMouseEnter={onMarkerMouseEnter}
              onMarkerMouseLeave={onMarkerMouseLeave}
            >
              {results.map(result => {
                const selected = Boolean(
                  selectedResult && selectedResult.id === result.id,
                )
                return (
                  <Marker
                    key={`${result.id}`}
                    lat={result.listing.location.lat}
                    lng={result.listing.location.lon}
                    hover={hoveredResultId === result.id}
                    result={result}
                    selected={selected}
                    onPopoverClose={onPopoverClose}
                    onNavigateToListing={onNavigateToListing}
                  />
                )
              })}
              {/* Custom Markers */}
              <BusMarker
                lat={this.state.bus._lat}
                lng={this.state.bus._long}
                selected={this.props.bus_open}
              />
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(
  connect(
    state => ({ searchText: state.searchText }),
    { clearSearch },
  )(GridContainer),
)
