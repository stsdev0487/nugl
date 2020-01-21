import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  content: {
    paddingTop: theme.spacing.unit * 2,
    maxWidth: 500,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.unit,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
  },
  titleContainer: {
    paddingBottom: theme.spacing.unit * 2,
  },
  commentContainer: {
    paddingTop: theme.spacing.unit * 2,
  },
  actions: {
    justifyContent: 'space-between',
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
})

const defaultClaim = {
  name: '',
  email: '',
  phone: '',
}

class ClaimDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultClaim,
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

    if (!this.state.name) {
      isValid = false
      errors.name = 'Name is Required'
    }

    if (!this.state.email) {
      isValid = false
      errors.email = 'Email is Required'
    }

    if (!this.state.phone) {
      isValid = false
      errors.phone = 'Phone is Required'
    }

    if (!isValid) {
      this.setState({ errors })
    } else {
      this.setState({ errors: {} })
    }

    return isValid
  }

  handleSubmit = () => {
    this.setState({ nextLoading: true })
    if (this.isValid()) {
      const { name, email, phone } = this.state
      this.props.onSubmit({ name, email, phone })
      this.setState({ name: '', email: '', phone: '' })
      this.handleClose()
    } else {
      this.setState({ nextLoading: false })
    }
  }

  render() {
    const { classes, theme, onClose, ...other } = this.props
    const { errors } = this.state
    return (
      <Dialog aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="responsive-dialog-title">
          {'Claim this Business'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your information below to claim this business:
          </DialogContentText>
          <div className={classes.content}>
            <div className={classes.commentContainer}>
              <TextField
                id="name"
                placeholder="Full Name"
                fullWidth
                onChange={this.handleChange('name')}
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                  },
                }}
              />
            </div>
            <div className={classes.commentContainer}>
              <TextField
                id="email"
                placeholder="Email"
                fullWidth
                onChange={this.handleChange('email')}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                  },
                }}
              />
            </div>
            <div className={classes.commentContainer}>
              <TextField
                id="phone"
                placeholder="Phone"
                fullWidth
                onChange={this.handleChange('phone')}
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  disableUnderline: true,
                  classes: {
                    root: classes.textFieldRoot,
                    input: classes.textFieldInput,
                  },
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={this.handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Claim
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ClaimDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(ClaimDialog),
)
