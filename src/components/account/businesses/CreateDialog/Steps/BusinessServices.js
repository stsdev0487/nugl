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
  serviceSelections: {
    maxHeight: 360,
    overflowY: 'auto',
    marginTop: 20,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
  },
})

const BusinessServices = ({ classes, business, errors, onChangeService }) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Services</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Select the services your retail location provicdes.
      </DialogContentText>
      <div className={classes.serviceSelections}>
        {business.type === BusinessTypes.RETAIL && (
          <FormControl error={!!errors.services} component="fieldset">
            {errors.services && (
              <FormHelperText>{errors.services}</FormHelperText>
            )}
            <FormGroup className={classes.formControl}>
              {Subtypes.filter(
                e => e.type === BusinessTypes.RETAIL,
              )[0].subtypes.map(option => {
                const camelCaseOption = toCamelCase(option)
                return (
                  <FormControlLabel
                    key={camelCaseOption}
                    control={
                      <Checkbox
                        checked={business.services[camelCaseOption]}
                        onChange={onChangeService(camelCaseOption)}
                        value={option}
                      />
                    }
                    label={option}
                  />
                )
              })}
            </FormGroup>
            {errors.services && (
              <FormHelperText>{errors.services}</FormHelperText>
            )}
          </FormControl>
        )}
        {business.type === BusinessTypes.INFLUENCER && (
          <FormControl error={!!errors.services} component="fieldset">
            {errors.services && (
              <FormHelperText>{errors.services}</FormHelperText>
            )}
            <FormGroup className={classes.formControl}>
              {Subtypes.filter(
                e => e.type === BusinessTypes.INFLUENCER,
              )[0].subtypes.map(option => {
                const camelCaseOption = toCamelCase(option)
                return (
                  <FormControlLabel
                    key={camelCaseOption}
                    control={
                      <Checkbox
                        checked={business.services[camelCaseOption]}
                        onChange={onChangeService(camelCaseOption)}
                        value={option}
                      />
                    }
                    label={option}
                  />
                )
              })}
            </FormGroup>
            {errors.services && (
              <FormHelperText>{errors.services}</FormHelperText>
            )}
          </FormControl>
        )}
        {business.type === BusinessTypes.SERVICE && (
          <FormControl error={!!errors.services} component="fieldset">
            <FormGroup className={classes.formControl}>
              {Subtypes.filter(
                e => e.type === BusinessTypes.SERVICE,
              )[0].subtypes.map(option => {
                const camelCaseOption = toCamelCase(option)
                return (
                  <FormControlLabel
                    key={camelCaseOption}
                    control={
                      <Checkbox
                        checked={business.services[camelCaseOption]}
                        onChange={onChangeService(camelCaseOption)}
                        value={option}
                      />
                    }
                    label={option}
                  />
                )
              })}
            </FormGroup>
            {errors.services && (
              <FormHelperText>{errors.services}</FormHelperText>
            )}
          </FormControl>
        )}
      </div>
    </DialogContent>
  </Fragment>
)

BusinessServices.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    serviceSelections: string,
    formControl: string,
  }).isRequired,
  business: shape({
    type: string,
    services: shape(),
  }).isRequired,
  errors: shape({
    type: string,
    services: shape(),
  }).isRequired,
  onChangeService: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessServices)
