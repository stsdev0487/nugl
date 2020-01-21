import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowDownIcon from '@material-ui/icons/ArrowDownward'

import styles from './styles'

const SortPanel = ({ classes, filterState, onFilterToggle }) => (
  <div className={classes.container}>
    <Typography onClick={onFilterToggle} className={classes.filterToggler}>
      <span>Name</span>
      <KeyboardArrowDownIcon className={filterState && classes.reversed} />
    </Typography>
  </div>
)

export default withStyles(styles)(SortPanel)
