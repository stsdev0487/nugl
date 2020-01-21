import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

import styles from './styles'

const SearchBar = ({ classes, onSearchChange, ...props }) => (
  <TextField
    {...props}
    onChange={onSearchChange}
    InputProps={{
      classes: {
        root: classes.fieldHolder,
      },
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
  />
)

export default withStyles(styles)(SearchBar)
