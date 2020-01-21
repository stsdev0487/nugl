import isEmpty from 'lodash.isempty'

const editBrandDialogValidation = (
  type,
  brand,
  logoImage,
  bannerImage,
  afterValidation,
) => {
  let isValid = true
  let errors = {}

  const validateSocialMediaRegEx = (field, message, pattern) => {
    if (brand[field] && !brand[field].match(pattern)) {
      isValid = false
      errors[field] = message
    }
  }

  const validateSocialField = (field, message) => {
    if (brand[field] && brand[field].indexOf('http') >= 0) {
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
  } else if (type === 'services') {
    const services = brand.services
    if (!services || isEmpty(services)) {
      isValid = false
      errors.services = 'Select at least 1 option.'
    }
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

export default editBrandDialogValidation
