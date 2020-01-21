import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'

const styles = theme => ({
  progress: {
    marginLeft: 'calc(50% - 20px)',
    marginTop: '20vh',
  },
})

const LoadingIndicator = ({ classes, className }) => {
  const itemClasses = classNames(classes.progress, className)
  return <CircularProgress className={itemClasses} color="secondary" />
}

export default withStyles(styles)(LoadingIndicator)
