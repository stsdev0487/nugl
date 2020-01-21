import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  title: {
    textAlign: 'center',
  },
  formLabel: {
    alignItems: 'flex-start',
  },
  checkbox: {
    alignItems: 'flex-start',
  },
  formGroup: {
    marginLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
  caption: {
    textAlign: 'center',
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
  },
})

class ComplianceDialog extends React.Component {
  state = {
    agree: false,
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  render() {
    const { agree } = this.state
    const { open, onAgreement, classes } = this.props
    return (
      <Dialog
        className={classes.main}
        open={open}
        aria-labelledby="compliance-dialog-title"
        aria-describedby="compliance-dialog-description"
      >
        <DialogTitle id="compliance-dialog-title" className={classes.title}>
          {'Are you eligible to visit Nugl.com?'}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="compliance-dialog-description">
            <FormGroup row className={classes.formGroup}>
              <FormControlLabel
                className={classes.formLabel}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={agree}
                    onChange={this.handleChange('agree')}
                    value="agree"
                  />
                }
                label={
                  <div>
                    I am at least 21 years old or a valid medical marijuana
                    patient and agree to the{' '}
                    <a
                      href="http://www.nugl.com/terms.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a
                      href="http://www.nugl.com/privacy.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </div>
                }
              />
            </FormGroup>
            <Typography variant="caption" className={classes.caption}>
              NUGL operates in compliance with state laws regarding access to
              cannabis. If you keep seeing this age prompt whenever you visit
              NUGL.com, please enable cookies in your web browser.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={onAgreement}
            disabled={!agree}
            color="primary"
            autoFocus
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ComplianceDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onAgreement: PropTypes.func.isRequired,
}

export default withStyles(styles)(ComplianceDialog)
