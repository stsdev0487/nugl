import React, { Fragment } from 'react'
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
  errors,
  updateName,
  updateUrl,
}) => (
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
          label="NUGL Retail ID"
          value={url}
          onChange={updateUrl}
          error={!!errors.url}
          helperText={
            errors.url || (
              <span>
                This will be the public URL where users can find your business.
                <br />
                <br />
                https://app.nugl.com/listings/
                {url}
              </span>
            )
          }
          margin="normal"
          fullWidth
        />
      </div>
    </DialogContent>
  </Fragment>
)

export default withStyles(styles, { withTheme: true })(BusinessName)
