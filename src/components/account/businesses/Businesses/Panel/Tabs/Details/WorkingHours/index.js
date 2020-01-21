import React, { Fragment } from 'react'
import moment from 'moment'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import { withStyles } from '@material-ui/core'

import ListItemText from '../../../../../../../common/ReversedListItemText'

import styles from './styles'

const formatTime = date => moment(date).format('LT')

const getFromToSting = ({ from, to }) =>
  `${formatTime(from.toDate())} - ${formatTime(to.toDate())}`

const WorkingHours = ({ classes, hours, handleClick }) => (
  <Fragment>
    <ListSubheader className={classes.listHeader} disableSticky>
      <span>Operating Hours</span>
      <IconButton onClick={handleClick('operatingHours')}>
        <EditIcon />
      </IconButton>
    </ListSubheader>

    {hours && Object.keys(hours).length > 0 && (
      <Fragment>
        <ListItem className={classes.listItem}>
          {hours.monday && hours.monday.open ? (
            <ListItemText
              primary={getFromToSting(hours.monday)}
              secondary="Monday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Monday" />
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {hours.tuesday && hours.tuesday.open ? (
            <ListItemText
              primary={getFromToSting(hours.tuesday)}
              secondary="Tuesday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Tuesday" />
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {hours.wednesday && hours.wednesday.open ? (
            <ListItemText
              primary={getFromToSting(hours.wednesday)}
              secondary="Wednesday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Wednesday" />
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {hours.thursday && hours.thursday.open ? (
            <ListItemText
              primary={getFromToSting(hours.thursday)}
              secondary="Thursday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Thursday" />
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {hours.friday && hours.friday.open ? (
            <ListItemText
              primary={getFromToSting(hours.friday)}
              secondary="Friday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Friday" />
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {hours.saturday && hours.saturday.open ? (
            <ListItemText
              primary={getFromToSting(hours.saturday)}
              secondary="Saturday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Saturday" />
          )}
        </ListItem>

        <ListItem className={classes.listItem}>
          {hours.sunday && hours.sunday.open ? (
            <ListItemText
              primary={getFromToSting(hours.sunday)}
              secondary="Sunday"
            />
          ) : (
            <ListItemText primary="CLOSED" secondary="Sunday" />
          )}
        </ListItem>
      </Fragment>
    )}
  </Fragment>
)

export default withStyles(styles)(WorkingHours)
