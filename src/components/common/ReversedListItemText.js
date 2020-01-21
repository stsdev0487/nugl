import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  reverseListItemText: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
})

const ReversedListItemText = ({ classes, ...other }) => {
  return <ListItemText className={classes.reverseListItemText} {...other} />
}

export default withStyles(styles)(ReversedListItemText)
