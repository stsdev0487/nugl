import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import DateRangeInput from '../../../../common/DateRangeInput'

const styles = theme => ({
  hoursSelections: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('xs')]: {
      overflowY: 'auto',
      marginTop: 20,
    },
  },
  error: {
    color: 'red',
  },
})

const BusinessOpenHours = ({
  classes,
  business,
  errors,
  onTimeChange,
  onClosedChecked,
}) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Operating Hours</DialogTitle>
    <DialogContent>
      <DialogContentText>
        When is your business open for operation?
      </DialogContentText>

      <div className={classes.hoursSelections}>
        {Object.keys(business.hours).map(day => {
          return (
            <DateRangeInput
              key={day}
              dayOfWeek={day}
              open={!!business.hours[day].open}
              fromValue={business.hours[day].from}
              toValue={business.hours[day].to}
              onTimeChange={onTimeChange}
              onClosedChecked={onClosedChecked}
            />
          )
        })}
      </div>
      {errors.hours && (
        <Typography
          variant="caption"
          className={classNames(classes.error, classes.topMargin)}
        >
          {errors.hours}
        </Typography>
      )}
    </DialogContent>
  </Fragment>
)

BusinessOpenHours.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    hoursSelections: string,
    error: string,
  }).isRequired,
  business: shape().isRequired,
  errors: shape().isRequired,
  onTimeChange: func.isRequired,
  onClosedChecked: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessOpenHours)
