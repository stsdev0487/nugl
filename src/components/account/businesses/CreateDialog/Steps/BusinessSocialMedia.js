import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  input: {
    display: 'flex',
    flexDirection: 'row',
  },
  url: {
    color: theme.palette.grey[400],
  },
  handle: {
    color: theme.palette.secondary.main,
  },
})

class BusinessSocialMedia extends React.PureComponent {
  render() {
    const {
      classes,
      business,
      errors,
      onChange,
      onSocialMediaPrefixChange,
    } = this.props

    return (
      <Fragment>
        <DialogTitle id="responsive-dialog-title">Social Media</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Link your social media accounts.
          </DialogContentText>

          <Typography className={classes.topMargin}>
            Please copy and paste your social medial handle into the text fields
            below.
          </Typography>
          <Typography className={classes.topMargin}>
            For example:{' '}
            <span className={classes.url}>https://www.facebook.com/</span>
            <span className={classes.handle}>justnuglit</span>
          </Typography>
          <div className={classes.input}>
            <TextField
              id="facebook"
              label="Facebook"
              value={business.facebook}
              placeholder="myfacebookhandle"
              onChange={onChange('facebook')}
              error={!!errors.facebook}
              helperText={errors.facebook}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    facebook.com/
                  </InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
            />
          </div>

          <div className={classes.input}>
            <TextField
              id="twitter"
              label="Twitter"
              value={business.twitter}
              placeholder="mytwitterhandle"
              onChange={onChange('twitter')}
              error={!!errors.twitter}
              helperText={errors.twitter}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">twitter.com/</InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="instagram"
              label="Instagram"
              value={business.instagram}
              placeholder="myinstagramhandle"
              onChange={onChange('instagram')}
              error={!!errors.instagram}
              helperText={errors.instagram}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    instagram.com/
                  </InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.input}>
            <TextField
              id="linkedIn"
              label="LinkedIn"
              value={business.linkedIn}
              placeholder="mylinkedinhandle"
              onChange={onChange('linkedIn')}
              error={!!errors.linkedIn}
              helperText={errors.linkedIn}
              InputProps={{
                startAdornment:
                  business.linkedInType === 'company' ? (
                    <InputAdornment position="start">
                      linkedin.com/company/
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="start">
                      linkedin.com/in/
                    </InputAdornment>
                  ),
                endAdornment: (
                  <InputAdornment position="end">
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={business.linkedInType === 'company'}
                            onChange={onSocialMediaPrefixChange(
                              'linkedInType',
                              'in',
                            )}
                            value={'company'}
                          />
                        }
                        label="Company"
                      />
                    </FormGroup>
                  </InputAdornment>
                ),
              }}
              margin="normal"
              fullWidth
            />
          </div>
        </DialogContent>
      </Fragment>
    )
  }
}

BusinessSocialMedia.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    input: string,
  }).isRequired,
  business: shape().isRequired,
  errors: shape().isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessSocialMedia)
