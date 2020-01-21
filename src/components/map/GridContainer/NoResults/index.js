import React from 'react'

import { withStyles, Typography, Button } from '@material-ui/core'
import { FilterList, Search } from '@material-ui/icons'

// import IconSearch from '../../../../static/images/search.gif';
import IconSearchWebM from '../../../../static/images/search.webm'
import IconSearchMP4 from '../../../../static/images/search.mp4'

import styles from './styles'

const NoResults = ({ onOpenFilterClick, classes, clearSearch }) => (
  <div className={classes.noResults}>
    {/* <img className={classes.noResultsImage} src={IconSearch} alt="No Results Found" /> */}
    <video
      className={classes.noResultsImage}
      alt="No Results Found"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={IconSearchWebM} type="video/webm" />
      <source src={IconSearchMP4} type="video/mp4" />
    </video>
    <Typography variant="h6" gutterBottom>
      No matching nearby results found.
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Try adjusting your filters, or doing a new search.
    </Typography>
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      onClick={onOpenFilterClick}
    >
      Update Filters
      <FilterList className={classes.rightIcon} />
    </Button>
    <Button
      variant="outlined"
      color="primary"
      className={classes.button}
      onClick={clearSearch}
    >
      Clear Search
      <Search className={classes.rightIcon} />
    </Button>
  </div>
)

export default withStyles(styles)(NoResults)
