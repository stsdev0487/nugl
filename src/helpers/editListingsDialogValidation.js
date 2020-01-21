import isEmpty from 'lodash.isempty'

const editListingsDialogValidation = (
  shop,
  type,
  logoImage,
  bannerImage,
  afterValidation,
) => {
  let isValid = true
  let errors = {}

  const validateTextField = (field, message) => {
    if (!shop[field] || shop[field] === '') {
      isValid = false
      errors[field] = message
    }
  }
  const validateSocialField = (field, message) => {
    if (shop[field] && shop[field].indexOf('http') >= 0) {
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
  if (type === 'logo') {
    const image = logoImage
    if (!image) {
      isValid = false
      errors.logoImage = 'Upload Logo Image'
    } else if (image.error) {
      isValid = false
      errors.logoImage = image.error.code
    }
  } else if (type === 'banner') {
    const image = bannerImage
    if (!image) {
      isValid = false
      errors.bannerImage = 'Upload Banner Image'
    } else if (image.error) {
      isValid = false
      errors.bannerImage = image.error.code
    }
  } else if (type === 'address') {
    validateTextField('address', 'Address is Required')
    validateTextField('city', 'City is Required')
    validateTextField('state', 'State is Required')
    validateTextField('zip', 'Zip Code is Required')
  } else if (type === 'verified') {
    validateTextField('formattedAddress', 'Please select your address')
  } else if (type === 'type') {
    validateTextField('type', 'Shop type is Required')
  } else if (type === 'type' || type === 'services') {
    const services = shop.services
    if (!services || isEmpty(services)) {
      isValid = false
      errors.services = 'Select at least 1 option.'
    }
  } else if (type === 'channels') {
    const channels = shop.channels
    if (!channels || isEmpty(channels)) {
      isValid = false
      errors.channels = 'Select at least 1 option.'
    }
  } else if (type === 'operatingHours') {
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
  } else if (type === 'socialMedia') {
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

export default editListingsDialogValidation
