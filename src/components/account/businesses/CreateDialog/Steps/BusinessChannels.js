import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormGroup from '@material-ui/core/FormGroup'

import BusinessTypes, { Subtypes } from '../../../../../const/BusinessTypes'
import { toCamelCase } from '../../../../../util/StringUtil'

const styles = theme => ({
  selections: {
    maxHeight: 360,
    overflowY: 'auto',
    marginTop: 20,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
  },
})

const BusinessChannels = ({ classes, business, errors, onChannelChange }) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Sales Channels</DialogTitle>
    <DialogContent>
      <DialogContentText>
        How do customers acquire your product?
      </DialogContentText>
      <div className={classes.selections}>
        {business.type === BusinessTypes.RETAIL && (
          <FormControl error={!!errors.channels} component="fieldset">
            {errors.channels && (
              <FormHelperText>{errors.channels}</FormHelperText>
            )}
            <FormGroup className={classes.formControl}>
              {Subtypes.filter(
                e => e.type === BusinessTypes.RETAIL,
              )[0].channels.map(option => {
                const camelCaseOption = toCamelCase(option)
                return (
                  <FormControlLabel
                    key={camelCaseOption}
                    control={
                      <Checkbox
                        checked={business.channels[camelCaseOption]}
                        onChange={onChannelChange(camelCaseOption)}
                        value={option}
                      />
                    }
                    label={option}
                  />
                )
              })}
            </FormGroup>
            {errors.channels && (
              <FormHelperText>{errors.channels}</FormHelperText>
            )}
          </FormControl>
        )}
        {business.type === BusinessTypes.INFLUENCER && (
          <FormControl error={!!errors.channels} component="fieldset">
            {errors.channels && (
              <FormHelperText>{errors.channels}</FormHelperText>
            )}
            <FormGroup className={classes.formControl}>
              {Subtypes.filter(
                e => e.type === BusinessTypes.INFLUENCER,
              )[0].channels.map(option => {
                const camelCaseOption = toCamelCase(option)
                return (
                  <FormControlLabel
                    key={camelCaseOption}
                    control={
                      <Checkbox
                        checked={business.channels[camelCaseOption]}
                        onChange={onChannelChange(camelCaseOption)}
                        value={option}
                      />
                    }
                    label={option}
                  />
                )
              })}
            </FormGroup>
            {errors.channels && (
              <FormHelperText>{errors.channels}</FormHelperText>
            )}
          </FormControl>
        )}
        {business.type === BusinessTypes.SERVICE && (
          <FormControl error={!!errors.channels} component="fieldset">
            <FormGroup className={classes.formControl}>
              {Subtypes.filter(
                e => e.type === BusinessTypes.SERVICE,
              )[0].channels.map(option => {
                const camelCaseOption = toCamelCase(option)
                return (
                  <FormControlLabel
                    key={camelCaseOption}
                    control={
                      <Checkbox
                        checked={business.channels[camelCaseOption]}
                        onChange={onChannelChange(camelCaseOption)}
                        value={option}
                      />
                    }
                    label={option}
                  />
                )
              })}
            </FormGroup>
            {errors.channels && (
              <FormHelperText>{errors.channels}</FormHelperText>
            )}
          </FormControl>
        )}
      </div>
    </DialogContent>
  </Fragment>
)

BusinessChannels.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    selections: string,
    formControl: string,
  }).isRequired,
  business: shape({
    type: string,
    channels: shape(),
  }).isRequired,
  errors: shape({
    type: string,
    channels: shape(),
  }).isRequired,
  onChannelChange: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessChannels)
