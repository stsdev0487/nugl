import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({})

const BusinessInfo = ({ classes, business, errors, onChange }) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Business Info</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Give us some basic info about your business.
      </DialogContentText>
      <div className={classes.input}>
        <TextField
          id="headline"
          label="Headline"
          multiline
          value={business.headline}
          onChange={onChange('headline')}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="announcement"
          label="Announcement"
          multiline
          value={business.announcement}
          onChange={onChange('announcement')}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="description"
          label="Description"
          multiline
          value={business.description}
          onChange={onChange('description')}
          error={!!errors.description}
          helperText={errors.description}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="phone"
          label="Business Phone"
          value={business.phone}
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
          label="Business Email"
          value={business.email}
          onChange={onChange('email')}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <TextField
          id="website"
          label="Website"
          value={business.website}
          onChange={onChange('website')}
          placeholder="http://"
          margin="normal"
          fullWidth
        />
      </div>
    </DialogContent>
  </Fragment>
)

BusinessInfo.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    input: string,
  }).isRequired,
  business: shape({
    description: string,
    phone: string,
    email: string,
    website: string,
  }).isRequired,
  errors: shape({
    description: string,
    phone: string,
    email: string,
    website: string,
  }).isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessInfo)
