import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { success } from '../../../store/actions/messageActions'
import { firestore } from '../../../firebase'

import styles from './styles'

const HeaderImage = require('../../../static/images/featured-profiles-form.jpg')

class UpgradeDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: props.profile,
      name: `${props.profile.firstName} ${props.profile.lastName}`,
      phone: props.profile.phone,
      email: props.profile.email,
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile && nextProps.profile.email && !this.state.profile) {
      this.setState({
        profile: nextProps.profile,
        name: `${nextProps.profile.firstName} ${nextProps.profile.lastName}`,
        phone: nextProps.profile.phone,
        email: nextProps.profile.email,
      })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  isValid = () => {
    let isValid = true
    let errors = {}

    if (!this.state.name) {
      isValid = false
      errors.name = 'Name is Required'
    }

    if (!this.state.phone) {
      isValid = false
      errors.phone = 'Phone is Required'
    }

    if (!this.state.email) {
      isValid = false
      errors.email = 'Email is Required'
    }

    if (!isValid) {
      this.setState({ errors })
    } else {
      this.setState({ errors: {} })
    }

    return isValid
  }

  handleSubmit = () => {
    if (this.isValid()) {
      const { uid: userId } = this.props.user
      const { name, phone, email } = this.state
      const request = { name, phone, email }
      firestore
        .collection('upgrades')
        .add({ ...request, userId, createdOn: new Date() })
        .then(() => {
          this.props.success('Thank you. Your request has been submitted.')
          this.props.onClose()
        })
    }
  }

  render() {
    const { open, onClose, classes } = this.props
    return (
      <Dialog
        className={classes.main}
        open={open}
        aria-labelledby="upgrade-dialog-title"
        aria-describedby="upgrade-dialog-description"
      >
        <Fragment>
          <img
            src={HeaderImage}
            className={classes.headerImage}
            alt="preview"
          />
          <DialogContent className={classes.content}>
            <DialogContentText id="upgrade-dialog-description">
              <Typography variant="h5" gutterBottom>
                Get your business featured in the NUGL app.
              </Typography>

              <Typography
                variant="caption"
                className={classes.caption}
                gutterBottom
              >
                Featured Profiles are the latest upgrade to your NUGL account.
                Make sure you stand out from the rest and upgrade your account
                today!
              </Typography>

              <Typography variant="h6" style={{ fontWeight: 'normal' }}>
                What you get with a featured profile:
              </Typography>
              <Typography
                variant="caption"
                className={classes.caption}
                gutterBottom
              >
                <ul>
                  <li>NUGL home page featured profile placement.</li>
                  <li>Featured profile listing in search results.</li>
                  <li>Larger, pulsing location pin on the map.</li>
                </ul>
                <b>Summer Special!</b> Pricing starting as low as $19/mo. Please
                fill out your details below and a representative will contact
                you shortly.
              </Typography>
              <div className={classes.inputContainer}>
                <TextField
                  id="name"
                  label="Contact Name"
                  className={classes.sideMargins}
                  value={this.state.name || ''}
                  onChange={this.handleChange('name')}
                  error={!!this.state.errors.name}
                  helperText={this.state.errors.name}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  id="phone"
                  label="Phone Number"
                  className={classes.sideMargins}
                  value={this.state.phone || ''}
                  onChange={this.handleChange('phone')}
                  error={!!this.state.errors.phone}
                  helperText={this.state.errors.phone}
                  margin="normal"
                  fullWidth
                />
              </div>
              <div className={classes.inputContainer}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.sideMargins}
                  value={this.state.email || ''}
                  onChange={this.handleChange('email')}
                  error={!!this.state.errors.email}
                  helperText={this.state.errors.email}
                  margin="normal"
                  fullWidth
                />
              </div>
            </DialogContentText>
          </DialogContent>
        </Fragment>

        <DialogActions className={classes.actions}>
          <Button size="small" color="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button size="small" color="primary" onClick={this.handleSubmit}>
            Submit
            <KeyboardArrowRight />
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

UpgradeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  { success },
)(
  withStyles(styles, { withTheme: true })(
    withMobileDialog()(withRouter(UpgradeDialog)),
  ),
)
