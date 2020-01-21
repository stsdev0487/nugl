import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { BusinessTypeConsumer } from '../../BusinessContext'

const styles = theme => ({
  selections: {
    overflowY: 'auto',
    marginTop: 20,
    [theme.breakpoints.up('md')]: {
      maxHeight: 260,
    },
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
  },
})

const BusinessAmenities = ({ classes, business, errors, onChange }) => (
  <BusinessTypeConsumer>
    {contextProps => {
      const amenityOptions = contextProps.amenities
      return (
        <Fragment>
          <DialogTitle id="responsive-dialog-title">Amenities</DialogTitle>
          <DialogContent>
            <DialogContentText>
              What amenities does your business offer?
            </DialogContentText>
            <div className={classes.selections}>
              <FormControl error={!!errors.amenities} component="fieldset">
                {errors.amenities && (
                  <FormHelperText>{errors.amenities}</FormHelperText>
                )}
                <FormGroup className={classes.formControl}>
                  {Object.keys(amenityOptions).map(amenity => {
                    return (
                      <FormControlLabel
                        key={amenity}
                        control={
                          <Checkbox
                            checked={business.amenities[amenity]}
                            onChange={onChange(amenity)}
                            value={amenityOptions[amenity]}
                          />
                        }
                        label={amenityOptions[amenity]}
                      />
                    )
                  })}
                </FormGroup>
                {errors.amenities && (
                  <FormHelperText>{errors.amenities}</FormHelperText>
                )}
              </FormControl>
            </div>
          </DialogContent>
        </Fragment>
      )
    }}
  </BusinessTypeConsumer>
)

BusinessAmenities.propTypes = {
  classes: shape({
    stepContent: string,
    topMargin: string,
    selections: string,
    formControl: string,
  }).isRequired,
  business: shape().isRequired,
  errors: shape().isRequired,
  amenities: shape().isRequired,
  onChange: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessAmenities)
