import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({})

const BusinessAddress = ({ classes, business, errors, onChange }) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Store Address</DialogTitle>
    <DialogContent>
      <DialogContentText>Where are you located?</DialogContentText>
      <div className={classes.input}>
        <TextField
          id="address"
          label="Address"
          value={business.address}
          onChange={onChange('address')}
          error={!!errors.address}
          helperText={errors.address}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="city"
          label="City"
          value={business.city}
          onChange={onChange('city')}
          error={!!errors.city}
          helperText={errors.city}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="state"
          label="State"
          value={business.state}
          onChange={onChange('state')}
          error={!!errors.state}
          helperText={errors.state}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="zip"
          label="Zip Code"
          value={business.zip}
          onChange={onChange('zip')}
          error={!!errors.zip}
          helperText={errors.zip}
          margin="normal"
          fullWidth
        />
      </div>
    </DialogContent>
  </Fragment>
)

BusinessAddress.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    input: string,
  }).isRequired,
  business: shape({
    address: string,
    city: string,
    state: string,
    zip: string,
  }).isRequired,
  errors: shape({
    address: string,
    city: string,
    state: string,
    zip: string,
  }).isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessAddress)
