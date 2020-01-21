import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import BusinessName from './BusinessName'
import BusinessCompliance from './BusinessCompliance'

import styles from './styles'

class Steps extends Component {
  renderStep = step => {
    const {
      business,
      agree,
      errors,
      handleChange,
      handleAgreeCheck,
    } = this.props

    const steps = [
      <BusinessName
        business={business}
        errors={errors}
        onChange={handleChange}
      />,
      <BusinessCompliance agree={agree} onChange={handleAgreeCheck} />,
    ]

    return steps[step]
  }

  render() {
    const { renderStep } = this
    const { activeStep } = this.props

    return renderStep(activeStep)
  }
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(Steps),
)
