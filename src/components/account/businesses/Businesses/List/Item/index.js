import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import Avatar from '../../../../../common/Avatar'

import styles from './styles'

const Item = ({ business, classes, onBusinessClick, servicesString }) => {
  return (
    <ListItem
      key={business.id}
      className={classes.listItem}
      button
      onClick={onBusinessClick(business)}
    >
      <Avatar
        className={classes.avatar}
        title={business.name}
        source={business.logoUrl}
      />
      <ListItemText
        className={classes.businessName}
        primary={<Typography variant="subtitle1">{business.name}</Typography>}
        secondary={servicesString}
      />
      <ListItemText
        className={classes.businessInfo}
        primary={business.reviewsCount}
        secondary="Reviews"
      />
      <ListItemSecondaryAction>
        <IconButton disabled color="primary" size="small">
          <NavigateNextIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default withStyles(styles)(Item)
