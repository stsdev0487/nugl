import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Autosuggest from 'react-autosuggest'

import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import MyLocationIcon from '@material-ui/icons/MyLocation'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import ListSubheader from '@material-ui/core/ListSubheader'
import MenuItem from '@material-ui/core/MenuItem'

import GoogleApi from '../../../api/GoogleApi'
import AlgoliaApi from '../../../api/AlgoliaApi'
import {
  setCenterPoint,
  setMarkerId,
  setSearchText,
  clearSearch,
} from '../../../store/actions/mapActions'

import styles from './styles'

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
      <span
        dangerouslySetInnerHTML={{
          __html: suggestion.description || suggestion.suggestion,
        }}
      />
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

class NuglSearchBar extends React.Component {
  inputRef = null

  state = {
    searchText: '',
    suggestions: [],
    selected: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selected) {
      this.props.clearSearch()
      return
    }
    if (prevState.searchText !== this.state.searchText) {
      this.props.setSearchText(this.state.searchText)
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    if (inputLength <= 0) {
      return Promise.resolve([])
    }
    return Promise.all([
      AlgoliaApi.autoCompleteSearch(inputValue, this.props.map.center),
      GoogleApi.autoCompleteSearch(inputValue),
    ]).then(results => {
      let suggestions = results[0]
      if (results[1]) {
        suggestions = [
          ...results[0],
          {
            section: 'Locations',
            suggestions: results[1].map(e => {
              return { ...e, section: 'Locations', suggestion: e.description }
            }),
          },
        ]
      }
      return Promise.resolve(suggestions.filter(e => e !== null))
    })
  }

  handleSuggestionsFetchRequested = ({ value }) => {
    this.getSuggestions(value).then(results => {
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

  handleShouldRenderSuggestions = value => {
    return value.length > 0
  }

  handleSuggestionSelected = (event, { suggestion }) => {
    if (suggestion.suggestion) {
      if (suggestion.section === 'Places') {
        // TODO: this is pretty us centric for state as region code
        this.props.setCenterPoint(
          {
            lat: suggestion.location.lat,
            lng: suggestion.location.lon,
            city: suggestion.city,
            region_code: suggestion.state,
          },
          suggestion.id,
        )
        this.props.setMarkerId(suggestion.id)
        this.setState({ searchText: suggestion.suggestion, selected: true })
        if (this.props.location.pathname !== '/') {
          this.props.history.push({
            pathname: '/',
          })
        }
      }

      if (suggestion.section === 'Brands') {
        this.setState({ searchText: suggestion.suggestion })
        this.props.history.push(`/brands/${suggestion.id}`)
      }

      if (suggestion.section === 'Locations') {
        GoogleApi.geocodeSearch('place_id', suggestion.placeId).then(
          results => {
            if (results.length > 0) {
              const { location } = results[0]
              this.props.setCenterPoint(
                {
                  ...location,
                  city: results[0].locality,
                  region_code: results[0].administrative_area_level_1,
                },
                null,
                true,
              )
            }
          },
        )

        if (this.props.location.pathname !== '/') {
          this.props.history.push('/')
        }
      }
    }
  }

  handleInputClick = () => {
    this.inputRef.setSelectionRange(0, this.inputRef.value.length)
  }

  handleLocationClick = () => {
    const { currentLocation, setCenterPoint } = this.props
    setCenterPoint(
      {
        lat: currentLocation.latitude,
        lng: currentLocation.longitude,
        city: currentLocation.city,
        region_code: currentLocation.region_code,
      },
      null,
      true,
    )
    if (this.props.location.pathname !== '/') {
      this.props.history.push('/')
    }
  }

  handleChange = (event, { newValue }) => {
    if (newValue !== 'undefined') this.setState({ searchText: newValue })
  }

  renderInput = inputProps => {
    const {
      classes,
      autoFocus,
      value,
      ref,
      placeholder,
      onChange,
      onInputClick,
      onLocationClick,
      ...other
    } = inputProps
    const { currentLocation } = this.props
    return (
      <FormControl className={classes.formControl}>
        <Input
          id="search-term"
          disableUnderline
          placeholder="Search NUGL"
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
            <InputAdornment
              className={classes.searchAdornment}
              position="start"
            >
              <IconButton className={classes.searchButton} disabled>
                <SearchIcon className={classes.searchIcon} />
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
    const { searchText, suggestions } = this.state

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        multiSection
        renderInputComponent={this.renderInput}
        highlightFirstSuggestion
        suggestions={suggestions}
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
          value: searchText,
          onChange: this.handleChange,
          onInputClick: this.handleInputClick,
          onLocationClick: this.handleLocationClick,
        }}
      />
    )
  }
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
      { setCenterPoint, setMarkerId, setSearchText, clearSearch },
    )(NuglSearchBar),
  ),
)
