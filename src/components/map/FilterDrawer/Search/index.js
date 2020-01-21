import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Autosuggest from 'react-autosuggest'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import SearchIcon from '@material-ui/icons/Search'

import styles from './styles'

class Search extends Component {
  inputRef = null
  state = {
    searchText: '',
  }

  componentDidMount() {
    this.inputRef.focus()
  }

  getSuggestionValue = suggestion => suggestion.name

  handleSuggestionsFetchRequested = ({ value }) => {
    const { onFetch } = this.props
    onFetch(value)
  }

  handleSuggestionsClearRequested = () => {
    const { onClear } = this.props
    onClear()
  }

  handleSuggestionSelected = (event, selection) => {
    const { onSelect } = this.props
    onSelect(selection.suggestion)
    this.setState({
      searchText: '',
    })
  }

  handleInputClick = () => {
    this.inputRef.setSelectionRange(0, this.inputRef.value.length)
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      searchText: newValue,
    })
  }

  renderSuggestionsContainer = options => {
    const { containerProps, children } = options
    return <Paper {...containerProps}>{children}</Paper>
  }

  renderSuggestion = suggestion => {
    const { classes } = this.props
    return (
      <MenuItem className={classes.menuItem}>
        <Avatar
          alt={suggestion.name}
          src={suggestion.logoUrl}
          className={classes.avatar}
        />
        <ListItemText
          primary={suggestion.name}
          classes={{ primary: classes.listItemText }}
        />
      </MenuItem>
    )
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
      ...other
    } = inputProps

    return (
      <TextField
        id="brand-query"
        placeholder="Search brand name..."
        onChange={onChange}
        value={value}
        onClick={onInputClick}
        inputRef={e => {
          this.inputRef = e
          return ref(e)
        }}
        className={classes.textField}
        InputLabelProps={{
          classes: {
            root: classes.textFieldLabel,
            focused: classes.textFieldFocused,
            shrink: classes.textFieldShink,
          },
        }}
        InputProps={{
          classes: {
            root: classes.textFieldOutlinedInput,
            focused: classes.textFieldFocused,
            notchedOutline: classes.textFieldNotchedOutline,
          },
          endAdornment: (
            <InputAdornment disableTypography position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        margin="normal"
        variant="outlined"
        {...other}
      />
    )
  }

  render() {
    const {
      renderInput,
      renderSuggestion,
      renderSuggestionsContainer,
      handleSuggestionsFetchRequested,
      handleSuggestionsClearRequested,
      handleSuggestionSelected,
      handleChange,
      handleInputClick,
      getSuggestionValue,
    } = this
    const { searchText } = this.state
    const { brands, classes } = this.props

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={brands}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        onSuggestionSelected={handleSuggestionSelected}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={{
          autoFocus: false,
          classes,
          value: searchText || '',
          onChange: handleChange,
          onInputClick: handleInputClick,
        }}
      />
    )
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Search)
