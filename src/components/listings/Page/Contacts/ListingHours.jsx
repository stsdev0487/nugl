import React, { Fragment } from 'react'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemText from '../../../common/ReversedListItemText'

const ListingHours = ({ classes, dbHours, isOpen }) => {
  if (!dbHours || Object.keys(dbHours).length === 0) return null
  const hours = dbHours
  return (
    <Fragment>
      <ListSubheader className={classes.listHeader} disableSticky>
        <span>Hours</span>
      </ListSubheader>
      <ListItem className={classes.listItem}>
        {hours && hours.monday && hours.monday.open ? (
          <ListItemText
            primary={`${moment(hours.monday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.monday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 1 ? (
                <Fragment>
                  Monday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Monday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Monday" />
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        {hours && hours.tuesday && hours.tuesday.open ? (
          <ListItemText
            primary={`${moment(hours.tuesday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.tuesday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 2 ? (
                <Fragment>
                  Tuesday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Tuesday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Tuesday" />
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        {hours && hours.wednesday && hours.wednesday.open ? (
          <ListItemText
            primary={`${moment(hours.wednesday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.wednesday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 3 ? (
                <Fragment>
                  Wednesday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Wednesday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Wednesday" />
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        {hours && hours.thursday && hours.thursday.open ? (
          <ListItemText
            primary={`${moment(hours.thursday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.thursday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 4 ? (
                <Fragment>
                  Thursday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Thursday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Thursday" />
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        {hours && hours.friday && hours.friday.open ? (
          <ListItemText
            primary={`${moment(hours.friday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.friday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 5 ? (
                <Fragment>
                  Friday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Friday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Friday" />
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        {hours && hours.saturday && hours.saturday.open ? (
          <ListItemText
            primary={`${moment(hours.saturday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.saturday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 6 ? (
                <Fragment>
                  Saturday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Saturday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Saturday" />
        )}
      </ListItem>

      <ListItem className={classes.listItem}>
        {hours && hours.sunday && hours.sunday.open ? (
          <ListItemText
            primary={`${moment(hours.sunday.from.toDate()).format(
              'LT',
            )} - ${moment(hours.sunday.to.toDate()).format('LT')}`}
            secondary={
              isOpen && new Date().getDay() === 0 ? (
                <Fragment>
                  Sunday - <span className={classes.openIcon}>Open Now</span>
                </Fragment>
              ) : (
                'Sunday'
              )
            }
          />
        ) : (
          <ListItemText primary="CLOSED" secondary="Sunday" />
        )}
      </ListItem>
    </Fragment>
  )
}

export default ListingHours
