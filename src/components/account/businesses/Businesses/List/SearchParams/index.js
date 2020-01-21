import React, { PureComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'

import SearchBar from '../../../../../common/SearchBar'

import styles from './styles'

class SearchParams extends PureComponent {
  handleSearchChange = ({ target: { value } }) => {
    const { onSearchChange } = this.props
    onSearchChange(value)
  }

  render() {
    const { handleSearchChange } = this
    const { classes } = this.props

    return (
      <div className={classes.searchBar}>
        <SearchBar onSearchChange={handleSearchChange} fullWidth />
      </div>
    )
  }
}

export default withStyles(styles)(SearchParams)
