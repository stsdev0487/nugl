import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'

const Tutorial1 = require('../../static/images/tutorial/Tutorial-1.png')
const Tutorial2 = require('../../static/images/tutorial/Tutorial-2.png')

const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 0,
    width: 'calc(100% - 48px)',
  },
  caption: {
    fontSize: '0.9em',
  },
  headerImage: {
    width: '100%',
  },
  lilNuglContainer: {
    width: 120,
    minHeight: 110,
    position: 'relative',
    marginLeft: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  lilNugl: {
    width: 80,
    bottom: 0,
    right: 0,
    position: 'absolute',
  },
  list: {
    padding: 0,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  actions: {
    margin: 0,
  },
  stepper: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
})

class WelcomeDialog extends React.Component {
  state = {
    step: 0,
    accountType: '',
  }

  componentWillMount() {
    const { accountType, upgrading } = this.props
    const step = upgrading ? 1 : 0
    if (accountType) {
      this.setState({ accountType, upgrading, step })
    }
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  handleSkip = () => {
    const { accountType } = this.state
    this.props.onClose(accountType)
  }

  handleCancel = () => {
    const { accountType } = this.state
    this.props.onClose(accountType === 'business' ? 'personal' : 'business')
  }

  handleNext = () => {
    const { step, accountType } = this.state
    if (accountType === 'personal' || step >= 1) {
      this.props.onClose(accountType)
      if (accountType === 'business') {
        this.props.history.push('/account/')
      }
    } else {
      this.setState({ step: step + 1 })
    }
  }

  handleBack = () => {
    const { step, accountType } = this.state
    let nextStep = step - 1
    if (accountType === 'personal' && nextStep === 6) {
      nextStep = 4
    }
    if (step >= 1) {
      this.setState({ step: nextStep })
    }
  }

  handleAccountTypeToggle = accountType => () => {
    this.setState({ accountType })
  }

  renderLilNugl = () => {
    const { classes } = this.props
    return (
      <div className={classes.lilNuglContainer}>
        <img
          src={require('../../static/images/lil-nugl.png')}
          className={classes.lilNugl}
          alt="preview"
        />
      </div>
    )
  }

  renderStep = () => {
    const { classes } = this.props
    const { step, accountType } = this.state
    switch (step) {
      case 0:
        return (
          <Fragment>
            <img
              src={Tutorial1}
              className={classes.headerImage}
              alt="preview"
            />
            <DialogContent className={classes.content}>
              <DialogContentText id="welcome-dialog-description">
                <Typography variant="h6" gutterBottom>
                  Welcome to NUGL!
                </Typography>
                <Typography
                  variant="caption"
                  className={classes.caption}
                  gutterBottom
                >
                  Your account is almost created.
                  <br />
                  <br />
                  We just need to know what type of account you want to have.
                </Typography>
              </DialogContentText>
            </DialogContent>
          </Fragment>
        )
      case 1:
        return (
          <Fragment>
            <img
              src={Tutorial2}
              className={classes.headerImage}
              alt="preview"
            />
            <DialogContent className={classes.content}>
              <div>
                <DialogContentText id="welcome-dialog-description">
                  <Typography variant="h6" gutterBottom>
                    Let's choose your account type.
                  </Typography>
                </DialogContentText>
                <List className={classes.list}>
                  <ListItem
                    className={classes.listItem}
                    dense
                    button
                    onClick={this.handleAccountTypeToggle('personal')}
                  >
                    <Checkbox checked={accountType === 'personal'} />
                    <ListItemText
                      primary={<b>Personal Account</b>}
                      secondary="I'd like to search for cannabis."
                    />
                  </ListItem>
                  <ListItem
                    className={classes.listItem}
                    dense
                    button
                    onClick={this.handleAccountTypeToggle('business')}
                  >
                    <Checkbox checked={accountType === 'business'} />
                    <ListItemText
                      primary={<b>Business Account</b>}
                      secondary="I'd like to set up, edit, and manage company listing(s) on NUGL."
                    />
                  </ListItem>
                </List>
              </div>
            </DialogContent>
          </Fragment>
        )
      default:
        return null
    }
  }

  renderBackButton = (step, accountType, upgrading) => {
    if (step === 1 && upgrading) {
      return (
        <Button size="small" color="secondary" onClick={this.handleCancel}>
          Cancel
        </Button>
      )
    }
    if (step === 0 && accountType) {
      return (
        <Button size="small" color="secondary" onClick={this.handleSkip}>
          Skip
        </Button>
      )
    }
    return (
      <Button size="small" onClick={this.handleBack} disabled={step === 0}>
        <KeyboardArrowLeft />
        Back
      </Button>
    )
  }

  render() {
    const { open, classes } = this.props
    const { step, accountType, upgrading } = this.state
    return (
      <Dialog
        className={classes.main}
        open={open}
        aria-labelledby="welcome-dialog-title"
        aria-describedby="welcome-dialog-description"
      >
        {this.renderStep(step)}
        <DialogActions className={classes.actions}>
          <MobileStepper
            variant="progress"
            steps={accountType === 'personal' ? 1 : 2}
            position="static"
            activeStep={step}
            className={classes.stepper}
            nextButton={
              <Button
                size="small"
                color="primary"
                onClick={this.handleNext}
                disabled={step === 1 && !accountType}
              >
                {step === 2 ? 'Finish' : 'Next'}
                <KeyboardArrowRight />
              </Button>
            }
            backButton={this.renderBackButton(step, accountType, upgrading)}
          />
        </DialogActions>
      </Dialog>
    )
  }
}

WelcomeDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool.isRequired,
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(withRouter(WelcomeDialog)),
)
