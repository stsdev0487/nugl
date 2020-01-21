import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions'
import withMobileDialog from '@material-ui/core/withMobileDialog'

import styles from './styles'

class OtherActions extends Component {
  renderBackButton = () => {
    const {
      type,
      editServices,
      validateAddress,
      loading,
      onClose,
      handleBack,
    } = this.props

    const notFirst =
      (type === 'type' && editServices) ||
      (type === 'address' && validateAddress)

    let button = (
      <Button disabled={loading} onClick={onClose}>
        Cancel
      </Button>
    )

    if (notFirst) {
      button = (
        <Button disabled={loading} onClick={handleBack}>
          Back
        </Button>
      )
    }

    if (type === 'brands') {
      button = <Button onClick={onClose}>Close</Button>
    }

    return button
  }

  save = () => {
    this.props.handleSave(this.props.type)
  }

  renderNextButton = () => {
    const {
      business,
      type,
      editChannels,
      validateAddress,
      loading,
      handleSave,
      classes,
      nextLoading,
      handleNext,
    } = this.props

    if (type === 'brands') {
      return null
    }
    const notLast =
      (type === 'type' && !editChannels) ||
      (type === 'address' && !validateAddress)
    let button = (
      <Button
        color="primary"
        disabled={type === 'verified' || loading}
        onClick={() => handleSave(type)}
      >
        {loading ? (
          <CircularProgress size={24} className={classes.buttonProgress} />
        ) : (
          'Save'
        )}
      </Button>
    )

    const disableIfType =
      type === 'type'
        ? !['Retail', 'Service', 'Influencer'].includes(business.type)
        : false

    if (notLast) {
      button = (
        <Button
          color="primary"
          disabled={loading || disableIfType}
          onClick={handleNext}
        >
          {loading || nextLoading ? (
            <CircularProgress size={24} className={classes.buttonProgress} />
          ) : (
            'Next'
          )}
        </Button>
      )
    }

    return button
  }

  save = () => {
    this.props.handleSave(this.props.type)
  }

  renderNextButton = () => {
    const {
      business,
      type,
      editChannels,
      validateAddress,
      loading,
      handleSave,
      classes,
      nextLoading,
      handleNext,
    } = this.props

    const notLast =
      (type === 'type' && !editChannels) ||
      (type === 'address' && !validateAddress)
    let button = (
      <Button
        color="primary"
        disabled={type === 'verified' || loading}
        onClick={() => handleSave(type)}
      >
        {loading ? (
          <CircularProgress size={24} className={classes.buttonProgress} />
        ) : (
          'Save'
        )}
      </Button>
    )

    const disableIfType =
      type === 'type'
        ? !['Retail', 'Service', 'Influencer'].includes(business.type)
        : false

    if (notLast) {
      button = (
        <Button
          color="primary"
          disabled={loading || disableIfType}
          onClick={handleNext}
        >
          {loading || nextLoading ? (
            <CircularProgress size={24} className={classes.buttonProgress} />
          ) : (
            'Next'
          )}
        </Button>
      )
    }

    return button
  }

  render() {
    const { classes } = this.props

    const { renderBackButton, renderNextButton } = this

    return (
      <DialogActions className={classes.actions}>
        {renderBackButton()}
        {renderNextButton()}
      </DialogActions>
    )
  }
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(OtherActions),
)
