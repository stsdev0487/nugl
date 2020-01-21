import React, { Component } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  withMobileDialog,
  withStyles,
} from '@material-ui/core'

import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import Categories from '../../../../const/BusinessTypes'

import BrandIcon from '../../../../static/images/categories/brand.svg'
import RetailIcon from '../../../../static/images/categories/storefront.svg'
import ServiceIcon from '../../../../static/images/categories/service.svg'
import InfluencerIcon from '../../../../static/images/categories/influencer.svg'

import styles from './styles'

const defaultState = {
  businessType: null,
  errors: {
    name: '',
  },
  isValid: false,
}

class ContextSelectDialog extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState }
  }

  toggle = event => {
    this.setState({ businessType: event.target.value })
  }

  handleClose = () => {
    this.setState({ businessType: null })
    this.props.onClose()
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.businessType)
    this.setState({ businessType: null })
  }

  render() {
    const { errors } = this.state
    const { classes } = this.props
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={this.props.open}
        onBackdropClick={this.props.onClose}
      >
        <DialogTitle id="responsive-dialog-title">Create a Profile</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>Choose your profile type:</DialogContentText>

          <FormControl
            component="fieldset"
            required
            error={!!errors.name}
            className={classes.formControl}
          >
            <RadioGroup
              aria-label="type"
              name="type"
              className={classes.categoryToggles}
              value={this.state.businessType}
              onChange={this.toggle}
            >
              <FormControlLabel
                value={Categories.BRAND}
                control={<Radio />}
                label={
                  <div className={classes.inputWrapper}>
                    <div className={classes.categoryToggle}>
                      <img
                        className={classes.categoryIcon}
                        src={BrandIcon}
                        alt={Categories.BRAND}
                      />
                    </div>
                    <Typography
                      className={classes.categoryToggleLabel}
                      variant="caption"
                      gutterBottom
                    >
                      {Categories.BRAND}
                    </Typography>
                  </div>
                }
                labelPlacement="top"
              />
              <FormControlLabel
                value={Categories.RETAIL}
                control={<Radio />}
                label={
                  <div className={classes.inputWrapper}>
                    <div className={classes.categoryToggle}>
                      <img
                        className={classes.categoryIcon}
                        src={RetailIcon}
                        alt={Categories.RETAIL}
                      />
                    </div>
                    <Typography
                      className={classes.categoryToggleLabel}
                      variant="caption"
                      gutterBottom
                    >
                      {Categories.RETAIL}
                    </Typography>
                  </div>
                }
                labelPlacement="top"
              />
              <FormControlLabel
                value={Categories.SERVICE}
                control={<Radio />}
                label={
                  <div className={classes.inputWrapper}>
                    <div className={classes.categoryToggle}>
                      <img
                        className={classes.categoryIcon}
                        src={ServiceIcon}
                        alt={Categories.SERVICE}
                      />
                    </div>
                    <Typography
                      className={classes.categoryToggleLabel}
                      variant="caption"
                      gutterBottom
                    >
                      {Categories.SERVICE}
                    </Typography>
                  </div>
                }
                labelPlacement="top"
              />
              <FormControlLabel
                value={Categories.INFLUENCER}
                control={<Radio />}
                label={
                  <div className={classes.inputWrapper}>
                    <div className={classes.categoryToggle}>
                      <img
                        className={classes.categoryIcon}
                        src={InfluencerIcon}
                        alt={Categories.INFLUENCER}
                      />
                    </div>
                    <Typography
                      className={classes.categoryToggleLabel}
                      variant="caption"
                      gutterBottom
                    >
                      {Categories.INFLUENCER}
                    </Typography>
                  </div>
                }
                labelPlacement="top"
              />
            </RadioGroup>
            {errors.name && <FormHelperText>{errors.name}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button size="small" color="secondary" onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            size="small"
            color="primary"
            disabled={!this.state.businessType}
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
          } />
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(ContextSelectDialog),
)
