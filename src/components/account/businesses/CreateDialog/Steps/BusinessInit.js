import React, { Fragment } from 'react'
import { BusinessTypeConsumer } from '../../BusinessContext'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = () => ({})

const BusinessName = ({
  classes,
  name,
  url,
  phone,
  email,
  zip,
  errors,
  updateName,
  onChange,
  updateUrl,
}) => (
  <BusinessTypeConsumer>
    {context => (
      <Fragment>
        <DialogTitle id="responsive-dialog-title">Business Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Start by giving us the name of your business.
          </DialogContentText>
          <div className={classes.input}>
            <TextField
              id="name"
              label="Business Name"
              value={name}
              onChange={updateName}
              error={!!errors.name}
              helperText={errors.name}
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="id"
              label={`NUGL ${context.type} ID`}
              value={url}
              onChange={updateUrl}
              error={!!errors.url}
              helperText={
                errors.url || (
                  <span>
                    This will be the public URL where users can find your
                    business.
                    <br />
                    <br />
                    https://app.nugl.com/{`${context.collection}`}/{url}
                  </span>
                )
              }
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="phone"
              label="Phone"
              value={phone}
              onChange={onChange('phone')}
              placeholder={'(999)999-9999'}
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
              fullWidth
              InputProps={{
                type: 'tel',
              }}
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="email"
              label="Email"
              value={email}
              onChange={onChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="zip"
              label="Zip Code"
              value={zip}
              onChange={onChange('zip')}
              error={!!errors.zip}
              helperText={errors.zip}
              margin="normal"
              fullWidth
            />
          </div>
        </DialogContent>
      </Fragment>
    )}
  </BusinessTypeConsumer>
)

export default withStyles(styles, { withTheme: true })(BusinessName)
