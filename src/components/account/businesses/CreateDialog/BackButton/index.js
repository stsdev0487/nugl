import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import styles from './styles'

class BackButton extends Component {
  handleClick = () => {
    const { activeStep, handleStep, handleClose } = this.props

    let handleClickAction = () => handleStep(-1)

    if (activeStep === 0) {
      handleClickAction = handleClose
    }

    handleClickAction()
  }

  render() {
    const { handleClick } = this
    return (
      <Button size="small" color="secondary" onClick={handleClick}>
        Cancel
      </Button>
    )
  }
}

export default withStyles(styles)(BackButton)
