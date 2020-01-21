import React, { Component } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  MobileStepper,
  withMobileDialog,
  withStyles,
} from '@material-ui/core'
import BusinessContext from '../BusinessContext'
import { firestore } from '../../../../firebase'
import { toUrlFriendlyName } from '../../../../util/StringUtil'
import { mask } from '../../../../util/MaskUtil'

import styles from './styles'
import BusinessInit from './Steps/BusinessInit'
import emptyBusiness from '../../emptyBusiness'

const validateTextField = field => {
  if (!field || field === '') {
    return false
  }
  return true
}

const verifyUniqueUrl = async url => {
  const existingListing = await firestore
    .collection('listings')
    .doc(url)
    .get()

  const existingBrand = await firestore
    .collection('brands')
    .doc(url)
    .get()

  // TODO: one day...
  // const existingCompany = await firestore.collection('companies').doc(url).get();

  return !existingListing.exists && !existingBrand.exists
}

const defaultState = {
  step: 0,
  loading: false,
  name: '',
  url: '',
  email: '',
  phone: '',
  zip: '',
  errors: {
    name: '',
    url: '',
  },
  isValid: false,
  failedToSave: false,
}

class BusinessDialog extends Component {
  constructor(props) {
    super(props)
    this.state = { ...defaultState }
  }

  validate = async (name, url) => {
    let isValid = true
    const newErrors = {}
    const urlEntered = validateTextField(url)
    const nameEntered = validateTextField(name)
    if (!nameEntered) {
      newErrors.name = 'Business Name is Required'
      isValid = false
    }
    if (!urlEntered) {
      newErrors.url = 'Unique ID is Required'
      isValid = false
    }
    if (urlEntered) {
      const nameIsUnique = await verifyUniqueUrl(url)
      if (!nameIsUnique) {
        newErrors.url = 'Unique ID is Already Taken'
        isValid = false
      }
    }
    this.setState({
      loading: false,
      errors: newErrors,
      isValid,
    })
  }

  isValid = () => {
    let isValid = true
    let errors = {}

    if (!this.state.email) {
      isValid = false
      errors.email = 'Email is Required'
    }

    if (!this.state.phone) {
      isValid = false
      errors.phone = 'Phone is Required'
    }

    if (!this.state.zip) {
      isValid = false
      errors.zip = 'Zip Code is Required'
    }

    if (!isValid) {
      this.setState({ errors })
    } else {
      this.setState({ errors: {} })
    }

    return isValid
  }

  updateName = async event => {
    const name = event.target.value
    const url = toUrlFriendlyName(name)
    this.setState(
      {
        loading: true,
        name,
        url,
        isValid: false,
      },
      () => {
        this.validate(name, url)
      },
    )
  }

  updateUrl = async eventOrUrl => {
    const name = this.state.name
    const url = toUrlFriendlyName(
      typeof eventOrUrl === 'string' ? eventOrUrl : eventOrUrl.target.value,
    )
    this.setState(
      {
        loading: true,
        name,
        url,
        isValid: false,
      },
      () => {
        this.validate(name, url)
      },
    )
  }

  onChange = name => event => {
    const val = mask(name, event.target.value)
    this.setState({ ...this.state, [name]: val }, () => {
      this.validate(name, val)
    })
  }

  handleCancel = () => {
    this.setState({ ...defaultState })
    this.props.onClose()
  }

  handleSubmit = () => {
    if (this.isValid()) {
      let businessContext = this.context
      this.setState(
        () => ({
          loading: true,
        }),
        () => {
          const listing = {
            ...emptyBusiness,
            id: this.state.url,
            url: this.state.url,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            zip: this.state.zip,
            userId: this.props.userId,
            // createdOn: fieldValues.serverTimestamp(),
            createdOn: new Date(),
            type: businessContext.type,
            services: [],
          }
          firestore
            .doc(`${businessContext.collection}/${this.state.url}`)
            .set(listing)
            .then(() => {
              this.setState({ ...defaultState })
              this.props.onClose()
              this.props.onBusinessClick(listing)()
            })
            .catch(e => {
              console.error(e)
              this.setState({
                loading: false,
                failedToSave: true,
              })
            })
        },
      )
    }
  }

  render() {
    if (!this.props.open || !this.props.userId) return null
    const { classes } = this.props
    return (
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={this.props.open}
        onBackdropClick={this.props.onClose}
      >
        <BusinessInit
          name={this.state.name}
          url={this.state.url}
          email={this.state.email}
          phone={this.state.phone}
          zip={this.state.zip}
          updateName={this.updateName}
          updateUrl={this.updateUrl}
          errors={this.state.errors}
          failedToSave={this.state.failedToSave}
          onChange={this.onChange}
        />

        <DialogActions className={classes.actions}>
          <MobileStepper
            variant="progress"
            steps={1}
            position="static"
            activeStep={this.state.step}
            className={classes.stepper}
            nextButton={
              <Button
                size="small"
                color="primary"
                disabled={!this.state.isValid}
                onClick={this.handleSubmit}
              >
                {this.state.loading ? (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                ) : (
                  'Submit'
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                color="secondary"
                onClick={this.handleCancel}
              >
                {'Cancel'}
              </Button>
            }
          />
        </DialogActions>
      </Dialog>
    )
  }
}

BusinessDialog.contextType = BusinessContext

export default withStyles(styles, { withTheme: true })(
  withMobileDialog()(BusinessDialog),
)
