import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

const styles = theme => ({
  listItemSecondaryAction: {
    right: 24,
  },
})

const ListItemSecondaryActionExtraMargin = ({ classes, ...other }) => {
  return (
    <ListItemSecondaryAction
      className={classes.listItemSecondaryAction}
      {...other}
    />
  )
}

export default withStyles(styles)(ListItemSecondaryActionExtraMargin)
