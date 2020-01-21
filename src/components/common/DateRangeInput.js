import React from 'react'
import moment from 'moment'
import { withStyles, Typography, TextField, Switch } from '@material-ui/core'

import { dateRange as styles } from './styles'

const DayOrder = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
}

const DateRangeInput = ({
  all,
  dayOfWeek,
  open,
  fromValue,
  toValue,
  onTimeChange,
  onClosedChecked,
  classes,
}) => {
  const day = all
    ? 'Every day'
    : dayOfWeek.replace(/^(.)/g, $1 => $1.toUpperCase())
  const order = DayOrder[dayOfWeek]

  const handleTimeChange = fromOrTo => event => {
    const date = moment(event.target.value, 'hh:mm').toDate()
    onTimeChange(dayOfWeek, fromOrTo, date)
  }
  const fromString = fromValue
    ? moment(fromValue.toDate ? fromValue.toDate() : fromValue).format('hh:mm')
    : '--:--'
  const toString = toValue
    ? moment(toValue.toDate ? toValue.toDate() : toValue).format('hh:mm')
    : '--:--'

  return (
    <div className={classes.dateRange} style={{ order }}>
      <Typography className={classes.dayLabel} variant="subtitle1" gutterBottom>
        {day}:
      </Typography>
      <TextField
        id={`${dayOfWeek}Open`}
        label="From"
        type="time"
        defaultValue={fromString}
        className={classes.dateInput}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300, tabIndex: order * 3 + 1 }}
        onChange={handleTimeChange('from')}
        disabled={!open && !all}
      />
      <TextField
        id={`${dayOfWeek}Close`}
        label="To"
        type="time"
        defaultValue={toString}
        className={classes.dateInput}
        InputLabelProps={{ shrink: true }}
        inputProps={{ step: 300, tabIndex: order * 3 + 2 }}
        onChange={handleTimeChange('to')}
        disabled={!open && !all}
      />
      {all ? (
        <div className={classes.switchPlaceholder} />
      ) : (
        <Switch
          className={classes.daySwitch}
          checked={open}
          onChange={onClosedChecked(dayOfWeek)}
          inputProps={{ tabIndex: order * 3 + 3 }}
        />
      )}
    </div>
  )
}

export default withStyles(styles)(DateRangeInput)
