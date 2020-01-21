import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import BusinessTypes from '../../../../../const/BusinessTypes'

const styles = theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0 0 0`,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
  },
})

const BusinessType = ({ classes, business, errors, onCheckType }) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Business Type</DialogTitle>
    <DialogContent>
      <DialogContentText>
        What type of business are you adding?
      </DialogContentText>
      <FormControl
        component="fieldset"
        required
        error={!!errors.type}
        className={classes.formControl}
      >
        <RadioGroup
          aria-label="type"
          name="type"
          className={classes.group}
          value={business.type}
          onChange={onCheckType}
        >
          <FormControlLabel
            value={BusinessTypes.RETAIL}
            control={<Radio />}
            label={BusinessTypes.RETAIL}
          />
          <FormControlLabel
            value={BusinessTypes.SERVICE}
            control={<Radio />}
            label={BusinessTypes.SERVICE}
          />
          <FormControlLabel
            value={BusinessTypes.INFLUENCER}
            control={<Radio />}
            label={BusinessTypes.INFLUENCER}
          />
        </RadioGroup>
        {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
      </FormControl>
    </DialogContent>
  </Fragment>
)

BusinessType.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    formControl: string,
    group: string,
  }).isRequired,
  business: shape({
    type: string,
  }).isRequired,
  errors: shape({
    type: string,
  }).isRequired,
  onCheckType: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessType)
