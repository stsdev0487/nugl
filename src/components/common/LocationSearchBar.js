import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import PlaceIcon from '@material-ui/icons/Place'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'
import GoogleApi from '../../api/GoogleApi'
import { setCenterPoint } from '../../store/actions/mapActions'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    top: theme.spacing.unit * 6,
    left: -368,
    zIndex: 999,
    maxHeight: 400,
    overflowY: 'auto',
    width: 444,
    [theme.breakpoints.down('sm')]: {
      top: 40,
      left: 4,
      width: 'calc(100% - 8px)',
    },
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    // marginRight: 0, with search button
    borderRadius: 30,
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 2,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 8,
    },
  },
  textFieldRoot: {
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 2,
      justifyContent: 'space-between',
    },
  },
  textFieldInput: {
    fontSize: 14,
    padding: '7px 0 6px !important',
    color: theme.palette.grey['900'],
    // minWidth: 168 // with search button
    width: 136,
    [theme.breakpoints.down('md')]: {
      minWidth: 60,
    },
  },
  placeIcon: {
    fill: theme.palette.grey[300],
  },
  locationIcon: {
    fill: theme.palette.primary.main,
    fontSize: '20px !important',
  },
  startAdornment: {
    marginRight: 0,
    marginTop: 2,
  },
  searchButton: {
    padding: 6,
  },
})

function renderSectionTitle(section) {
  return (
    <div>
      <Divider />
      <ListSubheader disableSticky component="div">
        {section.section}
      </ListSubheader>
      <Divider />
    </div>
  )
}

function getSectionSuggestions(section) {
  return section.suggestions
}

function renderSuggestion(suggestion, { isHighlighted }) {
  return (
    <MenuItem selected={isHighlighted} component="div">
      {suggestion.description || suggestion.suggestion}
    </MenuItem>
  )
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  )
}

function getSuggestionValue(suggestion) {
  return String(suggestion.description)
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase()
  const inputLength = inputValue.length
  if (inputLength <= 0) {
    return Promise.resolve([])
  }
  return Promise.all([GoogleApi.autoCompleteSearch(inputValue)]).then(
    results => {
      const sections = []
      sections.push({
        section: 'Nearby',
        suggestions: results[0],
      })
      return Promise.resolve(sections)
    },
  )
}

class LocationSearchBar extends React.Component {
  inputRef = null

  state = {
    searchText: '',
    suggestions: [],
  }

  componentWillReceiveProps(nextProps) {
    // const currentLat = this.props.map.center ? this.props.map.center.lat : null;
    // const currentLon = this.props.map.center ? this.props.map.center.lng : null;

    if (
      nextProps.map.center
      // (nextProps.map.center.lat !== currentLat || nextProps.map.center.lng !== currentLon)
    ) {
      if (nextProps.map.center.city) {
        this.setState({
          searchText: `${nextProps.map.center.city}, ${nextProps.map.center.region_code}`,
        })
      } else if (nextProps.map.center.region_code) {
        this.setState({
          searchText: `${nextProps.map.center.region_code}`,
        })
      }
    }
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value).then(results => {
      this.setState({
        suggestions: results,
      })
    })
  }

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    })
  }

  handleShouldRenderSuggestions = value => value.length > 0

  handleSuggestionSelected = (event, { suggestion, sectionIndex }) => {
    if (sectionIndex === 0) {
      GoogleApi.geocodeSearch('place_id', suggestion.placeId).then(results => {
        if (results.length > 0) {
          const { location } = results[0]
          this.props.setCenterPoint({
            ...location,
            city: results[0].locality,
            region_code: results[0].administrative_area_level_1,
          })
        }
        // this.setState({ searchText: suggestion.description });
      })
    }
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  handleInputClick = () => {
    this.inputRef.setSelectionRange(0, this.inputRef.value.length)
  }

  handleLocationClick = () => {
    const { currentLocation, setCenterPoint } = this.props
    setCenterPoint({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
      city: currentLocation.city,
      region_code: currentLocation.region_code,
    })
    this.setState({
      searchText: `${currentLocation.city}, ${currentLocation.region_code}`,
    })
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      searchText: newValue,
    })
  }

  renderInput = inputProps => {
    const {
      classes,
      autoFocus,
      value,
      ref,
      placeholder,
      onChange,
      onLocationClick,
      onInputClick,
      ...other
    } = inputProps
    const { currentLocation } = this.props
    return (
      <FormControl className={classes.formControl}>
        <Input
          id="location-term"
          disableUnderline
          placeholder="Near..."
          onChange={onChange}
          value={value}
          onClick={onInputClick}
          inputRef={e => {
            this.inputRef = e
            return ref(e)
          }}
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          }}
          startAdornment={
            <InputAdornment className={classes.startAdornment} position="start">
              <IconButton className={classes.searchButton} disabled>
                <PlaceIcon className={classes.placeIcon} />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment className={classes.startAdornment} position="end">
              <IconButton
                className={classes.searchButton}
                onClick={onLocationClick}
                disabled={!(currentLocation && currentLocation.city)}
              >
                <MyLocationIcon className={classes.locationIcon} />
              </IconButton>
            </InputAdornment>
          }
          {...other}
        />
      </FormControl>
    )
  }

  render() {
    const { classes } = this.props
    const { searchText } = this.state
    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        multiSection={true}
        renderInputComponent={this.renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        onSuggestionSelected={this.handleSuggestionSelected}
        shouldRenderSuggestions={this.handleShouldRenderSuggestions}
        renderSuggestionsContainer={renderSuggestionsContainer}
        renderSectionTitle={renderSectionTitle}
        getSectionSuggestions={getSectionSuggestions}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: false,
          classes,
          placeholder: 'NUGL it',
          value: searchText || '',
          onChange: this.handleChange,
          onInputClick: this.handleInputClick,
          onLocationClick: this.handleLocationClick,
        }}
      />
    )
  }
}

LocationSearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    map: state.map,
    currentLocation: state.currentLocation,
  }
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      { setCenterPoint },
    )(LocationSearchBar),
  ),
)
