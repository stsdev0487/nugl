import React, { Fragment } from 'react'
import { func, bool } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const styles = theme => ({
  agreeFormLabel: {
    marginTop: theme.spacing.unit * 2,
    alignItems: 'flex-start',
  },
  agreeCheckbox: {
    alignItems: 'flex-start',
  },
})

const BusinessCompliance = ({ classes, agree, onChange, failedToSave }) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">You're almost done!</DialogTitle>
    <DialogContent style={{ maxWidth: '460px' }}>
      <FormGroup row className={classes.agreeFormGroup}>
        <FormControlLabel
          className={classes.agreeFormLabel}
          control={
            <Checkbox
              className={classes.agreeCheckbox}
              checked={agree}
              onChange={onChange}
              value="agree"
            />
          }
          label={
            <div>
              I have all necessary approvals, permits, licenses or otherwise to
              operate my business compliantly under all applicable, city,
              county, state and federal regulations.
            </div>
          }
        />
      </FormGroup>
      {failedToSave && (
        <DialogContentText>
          <br />
          There was an error saving your company. Please try again or contact us
          at accounts@nugl.com.
        </DialogContentText>
      )}
    </DialogContent>
  </Fragment>
)

BusinessCompliance.propTypes = {
  agree: bool.isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessCompliance)
