import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import withMobileDialog from '@material-ui/core/withMobileDialog'
import { toCamelCase } from '../../../../util/StringUtil'
import GoogleApi from '../../../../api/GoogleApi'
import { types, fieldValues } from '../../../../firebase'
import editDialogValidation from '../../../../helpers/editListingsDialogValidation'
import { nuglHost } from '../../../../const/Paths'
import { mask } from '../../../../util/MaskUtil'
import Actions from './Actions'
import AlgoliaApi from '../../../../api/AlgoliaApi'
import Steps from './Steps'

const styles = theme => ({})

const defaultState = {
  logoImage: null,
  bannerImage: null,
  errors: {},
  editServices: false,
  editChannels: false,
  validateAddress: false,
  nextLoading: false,
  verifiedAddresses: [],
  brandSearchResults: [],
}

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
      business: {
        ...props.business,
        services:
          props.business.services && props.business.services.length
            ? props.business.services.reduce(
                (r, v) => ({
                  ...r,
                  [toCamelCase(v)]: v,
                }),
                {},
              )
            : {},
        channels:
          props.business.channels && props.business.channels.length
            ? props.business.channels.reduce(
                (r, v) => ({
                  ...r,
                  [toCamelCase(v)]: v,
                }),
                {},
              )
            : {},
        amenities:
          props.business.amenities && props.business.amenities.length
            ? props.business.amenities.reduce(
                (r, v) => ({
                  ...r,
                  [toCamelCase(v)]: v,
                }),
                {},
              )
            : {},
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.business.brands.length !== nextProps.business.brands.length
    ) {
      this.setState({
        ...defaultState,
        business: {
          ...nextProps.business,
          services:
            nextProps.business.services && nextProps.business.services.length
              ? nextProps.business.services.reduce(
                  (r, v) => ({
                    ...r,
                    [toCamelCase(v)]: v,
                  }),
                  {},
                )
              : {},
          channels:
            nextProps.business.channels && nextProps.business.channels.length
              ? nextProps.business.channels.reduce(
                  (r, v) => ({
                    ...r,
                    [toCamelCase(v)]: v,
                  }),
                  {},
                )
              : {},
          amenities:
            nextProps.business.amenities && nextProps.business.amenities.length
              ? nextProps.business.amenities.reduce(
                  (r, v) => ({
                    ...r,
                    [toCamelCase(v)]: v,
                  }),
                  {},
                )
              : {},
        },
      })
    }
  }

  handleNext = () => {
    const { verifyAddress } = this
    const { type } = this.props
    const { editServices } = this.state

    if (type === 'address') {
      verifyAddress()
    } else if (type === 'type') {
      if (editServices) {
        this.setState({
          editServices: false,
          editChannels: true,
        })
      } else {
        this.setState({
          editServices: true,
        })
      }
    }
  }

  handleClose = () => {
    this.setState({
      ...defaultState,
      business: {
        ...this.props.business,
        services:
          this.props.business.services && this.props.business.services.length
            ? this.props.business.services.reduce(
                (r, v) => ({
                  ...r,
                  [toCamelCase(v)]: v,
                }),
                {},
              )
            : {},
        channels:
          this.props.business.channels && this.props.business.channels.length
            ? this.props.business.channels.reduce(
                (r, v) => ({
                  ...r,
                  [toCamelCase(v)]: v,
                }),
                {},
              )
            : {},
        amenities:
          this.props.business.amenities && this.props.business.amenities.length
            ? this.props.business.amenities.reduce(
                (r, v) => ({
                  ...r,
                  [toCamelCase(v)]: v,
                }),
                {},
              )
            : {},
      },
    })
    this.props.onClose()
  }

  handleBack = () => {
    const { type } = this.props
    this.setState(previous => {
      const { editServices, editChannels } = previous
      let newStateObject = {}
      if (type === 'address') {
        newStateObject = {
          validateAddress: false,
        }
      } else if (type === 'type') {
        if (editServices) {
          newStateObject = {
            editServices: false,
            editChannels: false,
          }
        } else if (editChannels) {
          newStateObject = {
            editServices: true,
            editChannels: false,
          }
        } else {
          newStateObject = {
            editServices: false,
          }
        }
      }

      return {
        ...newStateObject,
        errors: {},
        validateAddress: false,
        loading: false,
        nextLoading: false,
      }
    })
  }

  handleChange = name => event => {
    const val = mask(name, event.target.value)
    this.setState({
      business: {
        ...this.state.business,
        [name]: val,
      },
    })
  }

  handleSocialMediaPrefixChange = (type, offPrefix) => event => {
    const business = { ...this.state.business }
    if (event.target.checked) {
      business[type] = event.target.value
    } else {
      business[type] = offPrefix
    }
    this.setState({ business })
  }

  handleChangeService = name => (event, checked) => {
    const services = this.state.business.services || {}
    if (checked) {
      services[name] = event.target.value
    } else {
      delete services[name]
    }
    const business = { ...this.state.business, services }
    this.setState({ business })
  }

  handleChannelChange = name => (event, checked) => {
    const channels = this.state.business.channels || {}
    if (checked) {
      channels[name] = event.target.value
    } else {
      delete channels[name]
    }
    const business = { ...this.state.business, channels }
    this.setState({ business })
  }

  handleAmenitiesChange = name => (event, checked) => {
    const {
      business,
      business: { amenities },
    } = this.state

    const { value } = event.target

    if (checked) {
      amenities[name] = value
    } else {
      delete amenities[name]
    }

    this.setState({
      business: {
        ...business,
        amenities,
      },
    })
  }

  handleTimeChange = (dayOfWeek, fromOrTo, date) =>
    this.setState({
      business: {
        ...this.state.business,
        hours: {
          ...this.state.business.hours,
          [dayOfWeek]: {
            ...this.state.business.hours[dayOfWeek],
            [fromOrTo]: date,
          },
        },
      },
    })

  handleClosedChange = dayOfWeek => (event, checked) =>
    this.setState({
      business: {
        ...this.state.business,
        hours: {
          ...this.state.business.hours,
          [dayOfWeek]: {
            ...this.state.business.hours[dayOfWeek],
            open: checked,
          },
        },
      },
    })

  handleChangeType = (event, value) => {
    this.setState(previous => ({
      business: {
        ...previous.business,
        type: value,
        services: {},
      },
    }))
  }

  handleUploadPicture = name => (file, dataUrl) => {
    const business = { ...this.state.business }
    this.setState({
      business,
      [name]: { file, dataUrl },
    })
  }

  handleUploadError = name => error =>
    this.setState({
      [name]: { error },
    })

  handleVerfiedAddressCheck = (event, value) => {
    const address = this.state.verifiedAddresses.filter(
      e => e.formattedAddress === value,
    )[0]
    const business = {
      ...this.state.business,
      location: address.location,
      formattedAddress: address.formattedAddress,
    }
    this.setState({ business })
  }

  searchBrands = query => {
    AlgoliaApi.searchBrands(query).then(brandSearchResults => {
      this.setState({ brandSearchResults })
    })
  }

  clearBrands = () => {
    this.setState({ brandSearchResults: [] })
  }

  handleBrandSelect = brand => {
    this.props.connectBusinessToBrand(this.state.business, brand)
  }

  handleBrandDelete = brand => async () => {
    await this.props.removeBusinessToBrandConnection(this.state.business, brand)
  }

  handleSave = type => {
    const { logoImage, bannerImage } = this.state
    this.setState({
      loading: true,
      editServices: false,
      editChannels: false,
      editAmenities: false,
    })

    const serviceKeys = Object.keys(this.state.business.services)
    const channelKeys = Object.keys(this.state.business.channels)
    const amenityKeys = Object.keys(this.state.business.amenities)
    let business = {
      ...this.state.business,
      services: serviceKeys.map(key => this.state.business.services[key]),
      channels: channelKeys.map(key => this.state.business.channels[key]),
      amenities: amenityKeys.map(key => this.state.business.amenities[key]),
    }
    if (business.services.length <= 0) {
      business.services = fieldValues.delete()
    }
    if (business.channels.length <= 0) {
      business.channels = fieldValues.delete()
    }
    if (business.amenities.length <= 0) {
      business.amenities = fieldValues.delete()
    }

    if (
      type !== 'hours' &&
      business.hours &&
      Object.keys(business.hours.monday).length === 1
    ) {
      delete business.hours
    }
    if (!this.isValid()) {
      this.setState({ loading: false })
      return
    }

    this.props.onSubmit(business, logoImage, bannerImage).then(() => {
      this.setState({ loading: false, logoImage: null, bannerImage: null })
      this.props.onClose()
      this.props.pushMessage({
        type: 'custom',
        custom: (
          <div>
            <span>
              Saved your changes successfully!
              <br />
              To see how your new changes look, go ahead and{' '}
              <a
                href={`${nuglHost}/listings/${business.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                visit your store information page
              </a>
              !
            </span>
          </div>
        ),
      })
    })
  }

  afterValidation = errors => {
    this.setState({
      errors,
    })
  }

  isValid = () => {
    const { afterValidation } = this

    const { business, logoImage, bannerImage } = this.state

    const { type } = this.props

    return editDialogValidation(
      business,
      type,
      logoImage,
      bannerImage,
      afterValidation,
    )
  }

  verifyAddress = () => {
    this.setState({
      nextLoading: true,
    })

    const errors = {}

    if (this.isValid()) {
      GoogleApi.geocodeSearch(
        'address',
        [
          this.state.business.address,
          this.state.business.city,
          this.state.business.state,
          this.state.business.zip,
        ].join('+'),
      )
        .then(results => {
          if (results && results.length > 0) {
            const addresses = results.map((address, index) => {
              const point = new types.GeoPoint(
                address.location.lat,
                address.location.lng,
              )
              return {
                id: index,
                formattedAddress: address.formattedAddress,
                location: point,
              }
            })
            this.setState({
              nextLoading: false,
              verifiedAddresses: addresses,
              validateAddress: true,
              type: 'verified',
            })
          } else {
            errors.address = 'Error verifying address.'
            this.setState({
              nextLoading: false,
              errors,
              validateAddress: true,
            })
          }
        })
        .catch(error => {
          errors.address = 'Error verifying address.'
          this.setState({ nextLoading: false, errors, validateAddress: true })
        })
    }
  }

  render() {
    const {
      handleChange,
      handleVerfiedAddressCheck,
      handleChangeService,
      handleChannelChange,
      handleChangeType,
      handleTimeChange,
      handleClosedChange,
      handleSocialMediaPrefixChange,
      handleAmenitiesChange,
      handleUploadPicture,
      handleUploadError,
      handleClose,
      handleBack,
      handleNext,
      handleSave,
      searchBrands,
      clearBrands,
      handleBrandSelect,
      handleBrandDelete,
    } = this

    const { editing, classes, type, amenityOptions } = this.props

    const {
      business,
      loading,
      editServices,
      editChannels,
      validateAddress,
      nextLoading,
      errors,
      logoImage,
      bannerImage,
      verifiedAddresses,
      brandSearchResults,
    } = this.state

    console.log('edit dialog', business.brands)

    return (
      <Dialog
        open={editing}
        classes={classes}
        PaperProps={{
          style: {
            minHeight: 440,
          },
        }}
      >
        <Steps
          type={type}
          errors={errors}
          business={business}
          editServices={editServices}
          editChannels={editChannels}
          logoImage={logoImage}
          bannerImage={bannerImage}
          validateAddress={validateAddress}
          verifiedAddresses={verifiedAddresses}
          handleChange={handleChange}
          handleVerfiedAddressCheck={handleVerfiedAddressCheck}
          handleChangeService={handleChangeService}
          handleChannelChange={handleChannelChange}
          handleChangeType={handleChangeType}
          handleTimeChange={handleTimeChange}
          handleClosedChange={handleClosedChange}
          handleSocialMediaPrefixChange={handleSocialMediaPrefixChange}
          handleUploadPicture={handleUploadPicture}
          handleUploadError={handleUploadError}
          handleAmenitiesChange={handleAmenitiesChange}
          amenityOptions={amenityOptions}
          brandSearchResults={brandSearchResults}
          searchBrands={searchBrands}
          clearBrands={clearBrands}
          handleBrandSelect={handleBrandSelect}
          handleBrandDelete={handleBrandDelete}
        />

        <Actions
          type={type}
          business={business}
          editServices={editServices}
          editChannels={editChannels}
          validateAddress={validateAddress}
          verifiedAddresses={verifiedAddresses}
          loading={loading}
          nextLoading={nextLoading}
          handleBack={handleBack}
          onClose={handleClose}
          handleNext={handleNext}
          handleSave={handleSave}
        />
      </Dialog>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    pushMessage: message => {
      dispatch({
        type: 'PUSH_MESSAGE',
        message,
      })
    },
  }),
)(withStyles(styles, { withTheme: true })(withMobileDialog()(Edit)))
