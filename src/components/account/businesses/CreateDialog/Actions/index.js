import React, { Component } from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import MobileStepper from '@material-ui/core/MobileStepper'
import { withStyles } from '@material-ui/core/styles'
import NextButton from '../NextButton'
import BackButton from '../BackButton'

import styles from './styles'

class Actions extends Component {
  render() {
    const {
      activeStep,
      handleStep,
      handleSubmit,
      verifyAddress,
      nextLoading,
      agree,
      shop,
      verifyUniqueName,
      handleClose,
      classes,
    } = this.props

    return (
      <DialogActions className={classes.actions}>
        <MobileStepper
          variant="progress"
          steps={2}
          position="static"
          activeStep={activeStep}
          className={classes.stepper}
          nextButton={
            <NextButton
              handleStep={handleStep}
              handleSubmit={handleSubmit}
              activeStep={activeStep}
              verifyAddress={verifyAddress}
              nextLoading={nextLoading}
              agree={agree}
              shop={shop}
              verifyUniqueName={verifyUniqueName}
            />
          }
          backButton={
            <BackButton
              activeStep={activeStep}
              handleStep={handleStep}
              handleClose={handleClose}
            />
          }
        />
      </DialogActions>
    )
  }
}

export default withStyles(styles)(Actions)
