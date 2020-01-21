import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import CircularProgress from '@material-ui/core/CircularProgress'

import styles from './styles'

class NextButton extends Component {
  handleClick = () => {
    const {
      activeStep,
      verifyAddress,
      handleSubmit,
      verifyUniqueName,
      handleStep,
    } = this.props

    let handleClickAction = () => handleStep(1)

    if (activeStep === 12) {
      handleClickAction = handleSubmit
    } else if (activeStep === 4) {
      handleClickAction = verifyAddress
    } else if (activeStep === 0) {
      handleClickAction = verifyUniqueName
    }

    handleClickAction()
  }

  isDisabled = () => {
    const {
      nextLoading,
      activeStep,
      agree,
      shop: { id = 0 },
    } = this.props

    let disabled = false

    if (activeStep === 1) {
      disabled = !!nextLoading || !agree
    } else if (activeStep === 0) {
      disabled = !!nextLoading || !id
    }

    return disabled
  }

  render() {
    const { isDisabled, handleClick } = this
    const { activeStep, nextLoading, classes } = this.props
    const buttonText = activeStep !== 12 ? 'Next' : 'Finish'
    return (
      <Button
        size="small"
        color="primary"
        disabled={isDisabled()}
        onClick={handleClick}
      >
        {buttonText}
        {!!nextLoading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        <KeyboardArrowRight />
      </Button>
    )
  }
}

export default withStyles(styles)(NextButton)
