import React, { Component } from 'react'
import BusinessAddress from '../../CreateDialog/Steps/BusinessAddress'
import BusinessInfo from '../../CreateDialog/Steps/BusinessInfo'
import BusinessVerifyAddress from '../../CreateDialog/Steps/BusinessVerifyAddress'
import BusinessType from '../../CreateDialog/Steps/BusinessType'
import BusinessServices from '../../CreateDialog/Steps/BusinessServices'
import BusinessChannels from '../../CreateDialog/Steps/BusinessChannels'
import BusinessOpenHours from '../../CreateDialog/Steps/BusinessOpenHours'
import BusinessAmenities from '../../CreateDialog/Steps/BusinessAmenities'
import BusinessSocialMedia from '../../CreateDialog/Steps/BusinessSocialMedia'
import BusinessLogo from '../../CreateDialog/Steps/BusinessLogo'
import BusinessBanner from '../../CreateDialog/Steps/BusinessBanner'
import BusineseBrands from '../../CreateDialog/Steps/BusinessBrands'

class Content extends Component {
  getAddressComponent = valid => {
    const {
      business,
      errors,
      verifiedAddresses,
      handleChange,
      handleVerfiedAddressCheck,
    } = this.props

    return valid ? (
      <BusinessVerifyAddress
        business={business}
        verifiedAddresses={verifiedAddresses}
        errors={errors}
        onCheckAddress={handleVerfiedAddressCheck}
      />
    ) : (
      <BusinessAddress
        business={business}
        errors={errors}
        onChange={handleChange}
      />
    )
  }

  getTypeComponent = (editServices, editChannels) => {
    const {
      business,
      errors,
      handleChangeType,
      handleChangeService,
      handleChannelChange,
    } = this.props

    let typeComponent = (
      <BusinessType
        business={business}
        errors={errors}
        onCheckType={handleChangeType}
      />
    )

    if (editServices) {
      typeComponent = (
        <BusinessServices
          business={business}
          errors={errors}
          onChangeService={handleChangeService}
        />
      )
    }
    if (editChannels) {
      typeComponent = (
        <BusinessChannels
          business={business}
          errors={errors}
          onChannelChange={handleChannelChange}
        />
      )
    }
    return typeComponent
  }

  getStepComponent = type => {
    const { getAddressComponent, getTypeComponent } = this

    const {
      errors,
      business,
      logoImage,
      bannerImage,
      editServices,
      editChannels,
      validateAddress,
      handleChange,
      handleChangeService,
      handleChannelChange,
      handleTimeChange,
      handleClosedChange,
      handleSocialMediaPrefixChange,
      handleUploadPicture,
      handleUploadError,
      handleAmenitiesChange,
      amenityOptions,
      brandSearchResults,
      searchBrands,
      clearBrands,
      handleBrandSelect,
      handleBrandDelete,
    } = this.props

    const addressComponent = getAddressComponent(validateAddress)
    const typeComponent = getTypeComponent(editServices, editChannels)

    const steps = {
      business: (
        <BusinessInfo
          business={business}
          errors={errors}
          onChange={handleChange}
        />
      ),
      address: addressComponent,
      type: typeComponent,
      services: (
        <BusinessServices
          business={business}
          errors={errors}
          onChangeService={handleChangeService}
        />
      ),
      channels: (
        <BusinessChannels
          business={business}
          errors={errors}
          onChannelChange={handleChannelChange}
        />
      ),
      operatingHours: (
        <BusinessOpenHours
          business={business}
          errors={errors}
          onTimeChange={handleTimeChange}
          onClosedChecked={handleClosedChange}
        />
      ),
      socialMedia: (
        <BusinessSocialMedia
          business={business}
          errors={errors}
          onChange={handleChange}
          onSocialMediaPrefixChange={handleSocialMediaPrefixChange}
        />
      ),
      logo: (
        <BusinessLogo
          logoImage={
            logoImage && logoImage.dataUrl
              ? logoImage
              : { dataUrl: business.logoUrl }
          }
          errors={errors}
          onUpload={handleUploadPicture}
          onError={handleUploadError}
        />
      ),
      banner: (
        <BusinessBanner
          bannerImage={
            bannerImage && bannerImage.dataUrl
              ? bannerImage
              : { dataUrl: business.bannerUrl }
          }
          errors={errors}
          onUpload={handleUploadPicture}
          onError={handleUploadError}
        />
      ),
      amenities: (
        <BusinessAmenities
          business={business}
          errors={errors}
          onChange={handleAmenitiesChange}
          amenityOptions={amenityOptions}
        />
      ),
      brands: (
        <BusineseBrands
          business={business}
          errors={errors}
          brandSearchResults={brandSearchResults}
          searchBrands={searchBrands}
          clearBrands={clearBrands}
          handleBrandSelect={handleBrandSelect}
          handleBrandDelete={handleBrandDelete}
        />
      ),
    }

    return steps[type] || null
  }

  render() {
    const { getStepComponent } = this
    const { type } = this.props

    return getStepComponent(type)
  }
}

export default Content
