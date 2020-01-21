import isEmpty from 'lodash.isempty'

const createBrandsDialogValidation = (
  brand,
  activeStep,
  nameIsUnique,
  logoImage,
  bannerImage,
  afterValidation,
) => {
  let isValid = true
  const errors = {}

  const validateTextField = (field, message) => {
    if (!brand[field] || brand[field] === '') {
      isValid = false
      errors[field] = message
    }
  }

  if (activeStep === 0) {
    validateTextField('name', 'Brand Name is Required')
    validateTextField('id', 'Unique Name is Required')
    if (!nameIsUnique) {
      errors.id = 'Unique Name is Already Taken'
      isValid = false
    }
  } else if (activeStep === 1) {
    validateTextField('description', 'Description is Required')
  } else if (activeStep === 2) {
    /*if (!logoImage) {
      isValid = false;
      errors.logoImage = 'Upload Logo Image';
    } else if (logoImage.error) {
      isValid = false;
      errors.logoImage = logoImage.error.code;
    }*/
  } else if (activeStep === 3) {
    /*if (!bannerImage) {
      isValid = false;
      errors.bannerImage = 'Upload Banner Image';
    } else if (bannerImage.error) {
      isValid = false;
      errors.bannerImage = bannerImage.error.code;
    }*/
  } else if (activeStep === 4) {
    const { type } = brand
    if (!type) {
      isValid = false
      errors.type = 'Type is required'
    }
  } else if (activeStep === 5) {
    const { services } = brand
    if (!services || isEmpty(services)) {
      isValid = false
      errors.services = 'Select at least 1 option.'
    }
  }

  if (!isValid) {
    afterValidation(errors)
  } else {
    afterValidation({})
  }
  return isValid
}

export default createBrandsDialogValidation
