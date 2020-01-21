import isEmpty from 'lodash.isempty'

const createListingsDialogValidation = (
  shop,
  activeStep,
  nameIsUnique,
  logoImage,
  bannerImage,
  afterValidation,
) => {
  let isValid = true
  const errors = {}

  const validateTextField = (field, message) => {
    if (!shop[field] || shop[field] === '') {
      isValid = false
      errors[field] = message
    }
  }

  const validateSocialField = (field, message) => {
    if (shop[field] && shop[field].indexOf('http') > 0) {
      isValid = false
      errors[field] = message
    }
  }

  const validateSocialMediaRegEx = (field, message, pattern) => {
    if (shop[field] && !shop[field].match(pattern)) {
      isValid = false
      errors[field] = message
    }
  }

  if (activeStep === 0) {
    validateTextField('name', 'Listing Name is Required')
    validateTextField('id', 'Unique Name is Required')
    if (!nameIsUnique) {
      errors.id = 'Unique Name is Already Taken'
      isValid = false
    }
  } else if (activeStep === 1) {
    validateTextField('description', 'Description is Required')
    validateTextField('email', 'Email is Required')
  } else if (activeStep === 2) {
    const image = logoImage
    if (!image) {
      isValid = false
      errors.logoImage = 'Upload Logo Image'
    } else if (image.error) {
      isValid = false
      errors.logoImage = image.error.code
    }
  } else if (activeStep === 3) {
    const image = bannerImage
    if (!image) {
      isValid = false
      errors.bannerImage = 'Upload Banner Image'
    } else if (image.error) {
      isValid = false
      errors.bannerImage = image.error.code
    }
  } else if (activeStep === 4) {
    validateTextField('address', 'Address is Required')
    validateTextField('city', 'City is Required')
    validateTextField('state', 'State is Required')
    validateTextField('zip', 'Zip Code is Required')
  } else if (activeStep === 5) {
    validateTextField('formattedAddress', 'Please select your address')
  } else if (activeStep === 6) {
    validateTextField('type', 'Listing type is Required')
  } else if (activeStep === 7) {
    const { services } = shop
    if (!services || isEmpty(services)) {
      isValid = false
      errors.services = 'Select at least 1 option.'
    }
  } else if (activeStep === 8) {
    const { channels } = shop
    if (!channels || _.isEmpty(channels)) {
      isValid = false
      errors.channels = 'Select at least 1 option.'
    }
  } else if (activeStep === 9) {
    Object.keys(shop.hours).map(key => {
      const day = shop.hours[key]
      if (day.open) {
        if (!(day.from && day.to)) {
          isValid = false
          errors.hours = 'Open days require both an open and close time.'
        }
      }
      return day
    })
  } else if (activeStep === 10) {
    validateSocialField('facebook', 'Invalid Facebook Handle')
    validateSocialField('twitter', 'Invalid Twitter Handle')
    validateSocialField('instagram', 'Invalid Instagram Handle')
    validateSocialField('linkedIn', 'Invalid LinkedIn Handle')
    validateSocialMediaRegEx(
      'facebook',
      'Invalid Facebook Handle',
      /^[a-zA-Z0-9._-]*$/,
    )
    validateSocialMediaRegEx(
      'twitter',
      'Invalid Twitter Handle',
      /^[a-zA-Z0-9._-]*$/,
    )
    validateSocialMediaRegEx(
      'instagram',
      'Invalid Instagram Handle',
      /^[a-zA-Z0-9._-]*$/,
    )
    validateSocialMediaRegEx(
      'linkedIn',
      'Invalid LinkedIn Handle',
      /^[a-zA-Z0-9._-]*$/,
    )
  }

  if (!isValid) {
    afterValidation(errors)
  } else {
    afterValidation({})
  }

  return isValid
}

export default createListingsDialogValidation
