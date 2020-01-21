import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import { BusinessTypeConsumer } from '../BusinessContext'

import { capitalize } from '../../../../util/StringUtil'
import styles from './styles'

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: String(props.type),
      reason: '',
      description: '',
      errors: {},
    }
  }

  handleClose = () => {
    this.props.onClose()
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  isValid = () => {
    let isValid = true
    let errors = {}

    if (!this.state.reason) {
      isValid = false
      errors.email = 'Reason is Required'
    }

    if (!this.state.description) {
      isValid = false
      errors.description = 'Description is Required'
    }

    if (!isValid) {
      this.setState({ errors })
    } else {
      this.setState({ errors: {} })
    }

    return isValid
  }

  render() {
    const { open, classes, ...other } = this.props
    const { errors, reason } = this.state
    return (
      <BusinessTypeConsumer>
        {contextProps => {
          const type = contextProps.singular
          return (
            <Dialog open={open} {...other}>
              <DialogTitle id="responsive-dialog-title">
                Delete {capitalize(type)}
              </DialogTitle>
              <DialogContent>
                <Typography className={classes.topMargin}>
                  If you added this {type} by mistake or would like to
                  permanently delete this {type} for another reason, please fill
                  out the form below and we will review your case.
                </Typography>
                <div className={classes.content}>
                  <FormControl
                    component="fieldset"
                    required
                    error={!!errors.reason}
                    className={classes.formControl}
                  >
                    <RadioGroup
                      aria-label="reason"
                      name="reason"
                      className={classes.group}
                      onChange={this.handleChange('reason')}
                      value={reason}
                    >
                      <FormControlLabel
                        value={`I added this ${type} by mistake.`}
                        control={<Radio />}
                        label={`I added this ${type} by mistake.`}
                      />
                      <FormControlLabel
                        value="My business has been severely damaged due to fake negative reviews."
                        control={<Radio />}
                        label="My business has been severely damaged due to fake negative reviews."
                      />
                      <FormControlLabel
                        value="This business is no longer in operation."
                        control={<Radio />}
                        label="This business is no longer in operation."
                      />
                    </RadioGroup>
                    {errors.type && (
                      <FormHelperText>{errors.type}</FormHelperText>
                    )}
                  </FormControl>
                  <div className={classes.input}>
                    <TextField
                      id="description"
                      label="Description"
                      multiline
                      onChange={this.handleChange('description')}
                      error={!!errors.description}
                      helperText={
                        errors.description ||
                        `Please write a brief description of why you want to delete this ${type}.`
                      }
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </div>
              </DialogContent>
              <DialogActions className={classes.actions}>
                <div className={classes.footer}>
                  <Button onClick={this.handleClose} color="secondary">
                    Close
                  </Button>
                  <Button onClick={this.handleSubmit} color="primary">
                    Submit
                  </Button>
                </div>
              </DialogActions>
            </Dialog>
          )
        }}
      </BusinessTypeConsumer>
    )
  }
}

DeleteDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(DeleteDialog),
)
