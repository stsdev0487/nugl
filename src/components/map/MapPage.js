import React, { Component } from 'react'
import { connect } from 'react-redux'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import withWidth, { isWidthDown } from '@material-ui/core/withWidth'
import URLSearchParams from 'url-search-params'
import GridContainer from './GridContainer'
// import GridContainer from './GridContainer/GridContainer';
import AlgoliaApi from '../../api/AlgoliaApi'
import { setCenterPoint, setMarkerId } from '../../store/actions/mapActions'

import GoogleApi from '../../api/GoogleApi'
import AdApi from '../../api/AdApi'

const debouncedSearch = AwesomeDebouncePromise(GoogleApi.geocodeSearch, 1750)

class MapPage extends Component {
  constructor(props) {
    super(props)
    this.defaultCenter = props.map.center
    // TODO: this doesn't do what we want
    // this.setCenterPoint = AwesomeDebouncePromise(props.setCenterPoint, 1000);
    this.setCenterPoint = props.setCenterPoint
    this.state = {
      searchPage: 0,
      resultsPerPage: 20,
      results: [],
      hoveredResultId: null,
      selectedResult: null,
      filtersOpen: false,
      filters: {},
      ads: {},
      hasFilters: false,
      filterCount: 0,
    }
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search)
    const listingId = params.get('listingId')
    const latitude = params.get('lat')
    const longitude = params.get('lng')
    this.loadAds()
    if (latitude && longitude) {
      const center = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude),
      }
      this.setCenterPoint(center)
      if (listingId) {
        this.props.setMarkerId(listingId)
      }
      this.props.history.push('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentLocation && nextProps.map.default) {
      const center = {
        lat: nextProps.currentLocation.latitude,
        lng: nextProps.currentLocation.longitude,
        city: nextProps.currentLocation.city,
        region_code: nextProps.currentLocation.region_code,
      }
      this.setCenterPoint(center)
    }
  }

  loadAds = () => {
    const { width } = this.props
    const isAboveExtraSmall = !isWidthDown('sm', width)
    Promise.all([
      isAboveExtraSmall ? AdApi.generate('BLOCK') : Promise.resolve(),
      AdApi.generate('LEADERBOARD'),
    ]).then(ads => {
      this.setState(previous => ({
        ads: { ...previous.ads, mapBlock: ads[0], listingLeaderBoard: ads[1] },
      }))
    })
  }

  loadMarkers = async (center, filters, resultsPerPage, searchPage) => {
    const {
      currentLocation: { latitude, longitude },
      map: { markerId },
    } = this.props

    const newCenter = center
    const { preventRefresh } = this.state
    if (!preventRefresh) {
      AlgoliaApi.geoSearch(
        newCenter,
        { lat: latitude, lng: longitude },
        filters,
        resultsPerPage,
        searchPage,
      ).then(results => {
        if (markerId) {
          setMarkerId(null)
          this.setState({
            results,
            selectedResult: results.filter(e => e.id === markerId)[0],
            preventRefresh: false,
            searchPage,
          })
        } else {
          this.setState({ results, preventRefresh: false, searchPage })
        }
      })
    } else {
      this.setState({ preventRefresh: false, searchPage })
    }
    if (!center.city && !center.region_code) {
      // TODO: way too slow, and cors issue
      const geoCodeResults = await debouncedSearch(
        'address',
        `${center.lat},${center.lng}`,
      )
      if (geoCodeResults.length > 0) {
        if (!geoCodeResults[0].locality) return
        this.setCenterPoint({
          city: geoCodeResults[0].locality,
          region_code: geoCodeResults[0].administrative_area_level_1,
        })
      }
    }
  }

  handleNextPageClick = () => {
    const { searchPage, filters, resultsPerPage } = this.state
    const {
      map: { center },
    } = this.props
    this.loadMarkers(center, filters, resultsPerPage, searchPage + 1)
    this.setState({ searchPage: searchPage + 1 })
  }

  handleBackPageClick = () => {
    const { searchPage, filters, resultsPerPage } = this.state
    const {
      map: { center },
    } = this.props
    if (searchPage > 0) {
      this.loadMarkers(center, filters, resultsPerPage, searchPage - 1)
      this.setState({ searchPage: searchPage - 1 })
    }
  }

  handleFilterChanged = filters => {
    const { map } = this.props
    const { resultsPerPage } = this.state
    this.loadMarkers(map.center, filters, resultsPerPage, 0)
    const filtersKeys = Object.keys(filters)
    let hasFilters = false
    let filterCount = 0
    filtersKeys.forEach(key => {
      if (filters[key].length > 0) {
        hasFilters = true
        filterCount += filters[key].length
      }
    })
    this.setState({ filters, searchPage: 0, hasFilters, filterCount })
  }

  handleBoundsChanged = ({ center }) => {
    const { filters, resultsPerPage } = this.state

    this.loadMarkers(center, filters, resultsPerPage, 0)
    this.setCenterPoint(center)
    this.setState({ searchPage: 0 })
  }

  handleMarkerClick = id => {
    const { results } = this.state

    this.setState({
      selectedResult: results.filter(e => e.id === id)[0],
    })
  }

  handleMarkerMouseEnter = id => this.setState({ hoveredResultId: id })

  handleMarkerMouseLeave = () => this.setState({ hoveredResultId: null })

  handleListingClick = result => () => {
    this.setCenterPoint({
      lat: result.listing.location.lat,
      lng: result.listing.location.lon,
      city: result.listing.city,
      region_code: result.listing.state,
    })
    this.setState({ selectedResult: result, preventRefresh: true })
  }

  handlePopoverClose = () => {
    this.setState({ selectedResult: null })
  }

  handleNavigateToListing = listing => () => {
    // TODO: push to proper type
    let path = ''
    if (listing.type === 'Retail') {
      path = 'listings'
    }
    if (listing.type === 'Service') {
      path = 'services'
    }
    if (listing.type === 'Influencer') {
      path = 'influencers'
    }
    if (listing.type === 'Brand') {
      path = 'brands'
    }
    this.props.history.push(`/${path}/${listing.id}`)
  }

  handleToggleFilterDrawer = open => () => {
    this.setState({ filtersOpen: open })
  }

  handleResultsPerPageChange = event => {
    const { searchPage, filters } = this.state
    const {
      map: { center },
    } = this.props
    const resultsPerPage = event.target.value
    this.loadMarkers(center, filters, resultsPerPage, searchPage)
    this.setState({ resultsPerPage })
  }

  handleCloseBlockAd = () => {
    this.setState({ ads: { ...this.state.ads, mapBlock: null } })
  }

  render() {
    const {
      defaultCenter,
      handleNextPageClick,
      handleBackPageClick,
      handleMarkerMouseEnter,
      handleMarkerMouseLeave,
      handleBoundsChanged,
      handleRefreshClick,
      handleMarkerClick,
      handleListingClick,
      handlePopoverClose,
      handleNavigateToListing,
      handleToggleFilterDrawer,
      handleFilterChanged,
      handleResultsPerPageChange,
      handleCloseBlockAd,
    } = this

    const { map, currentLocation, amenities } = this.props
    const {
      searchPage,
      resultsPerPage,
      ads,
      hasFilters,
      filterCount,
      results,
      selectedResult,
      hoveredResultId,
      filtersOpen,
      listingLeaderBoard,
    } = this.state

    return (
      <GridContainer
        map={map}
        ads={ads}
        currentLocation={currentLocation}
        results={results}
        filtersOpen={filtersOpen}
        selectedResult={selectedResult}
        hoveredResultId={hoveredResultId}
        defaultCenter={defaultCenter}
        searchPage={searchPage}
        onNextPageClick={handleNextPageClick}
        onBackPageClick={handleBackPageClick}
        onMarkerMouseEnter={handleMarkerMouseEnter}
        onMarkerMouseLeave={handleMarkerMouseLeave}
        onBoundsChange={handleBoundsChanged}
        onRefreshClick={handleRefreshClick}
        onMarkerClick={handleMarkerClick}
        onListingClick={handleListingClick}
        onPopoverClose={handlePopoverClose}
        onNavigateToListing={handleNavigateToListing}
        onToggleFilterDrawer={handleToggleFilterDrawer}
        onCloseBlockAd={handleCloseBlockAd}
        updateFilter={handleFilterChanged}
        hasFilters={hasFilters}
        filterCount={filterCount}
        resultsPerPage={resultsPerPage}
        onResultsPerPageChange={handleResultsPerPageChange}
        amenities={amenities}
        listingLeaderBoard={listingLeaderBoard}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    map: state.map,
    currentLocation: state.currentLocation,
    amenities: ['1', '1', '3'],
  }
}

export default connect(
  mapStateToProps,
  { setCenterPoint, setMarkerId },
)(withWidth()(MapPage))
