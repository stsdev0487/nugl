import React, { Fragment } from 'react'
import { shape, string, func, arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0 0 0`,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
  },
})

const BusinessVerifyAddress = ({
  classes,
  business,
  errors,
  verifiedAddresses,
  onCheckAddress,
}) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Verify Address</DialogTitle>
    <DialogContent>
      <DialogContentText>Verify your address.</DialogContentText>
      <FormControl
        component="fieldset"
        required
        error={errors.verifiedAddress}
        className={classes.formControl}
      >
        <RadioGroup
          aria-label="verifiedAddress"
          name="verifiedAddress"
          className={classes.group}
          value={business.formattedAddress}
          onChange={onCheckAddress}
        >
          {verifiedAddresses.map(address => (
            <FormControlLabel
              key={address.formattedAddress}
              value={address.formattedAddress}
              control={<Radio />}
              label={address.formattedAddress}
            />
          ))}
        </RadioGroup>
        {errors.formattedAddress && (
          <FormHelperText>{errors.formattedAddress}</FormHelperText>
        )}
      </FormControl>
    </DialogContent>
  </Fragment>
)

BusinessVerifyAddress.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    formControl: string,
    group: string,
  }).isRequired,
  business: shape({
    formattedAddress: string,
  }).isRequired,
  errors: shape({
    formattedAddress: string,
  }).isRequired,
  verifiedAddresses: arrayOf(shape()).isRequired,
  onCheckAddress: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessVerifyAddress)
