import React from 'react'
import BusinessTypes from '../const/BusinessTypes'
import bus from '../static/images/pins/bus.png'

const featuredMultiplier = 0.3

const markerStyle = featured => {
  return {
    animation: featured ? 'Pulse 1s infinite' : '',
    height: 40 + 40 * (featured ? featuredMultiplier : 0),
    width: 40 + 40 * (featured ? featuredMultiplier : 0),
  }
}

export const BusMarker = () => (
  <a
    href="https://richandruthless.com/"
    target="_blank"
    rel="noopener noreferrer"
    title="NUGL & Rich And Ruthless Bus"
  >
    <img style={{ height: 50 }} alt="Nugl Bus!" src={bus} />
  </a>
)

export const ServiceMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/service.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Service"
  />
)

export const InfluencerMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/influencer.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Influencer"
  />
)

export const InfluencerExpandedMarker = () => (
  <img
    src={require('../static/images/pins/influencer-expanded.svg')} // eslint-disable-line
    style={{ height: 113, width: 340 }}
    alt="Influencer"
  />
)

export const ServiceExpandedMarker = () => (
  <img
    src={require('../static/images/pins/service-expanded.svg')} // eslint-disable-line
    style={{ height: 113, width: 340 }}
    alt="Service"
  />
)

export const ChurchMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/church.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Church"
  />
)

export const BrandMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/brand.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Brand"
  />
)

export const RetailMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/retail.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Dispensary"
  />
)

export const RetailDispensaryMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/dispensary.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Dispensary"
  />
)

export const ShopMarker = ({ featured }) => (
  <img
    src={require('../static/images/pins/dispensary.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Dispensary"
  />
)

export const ShopMarkerDelivery = ({ featured }) => (
  <img
    src={require('../static/images/pins/dispensary-delivery.svg')} // eslint-disable-line
    style={markerStyle(featured)}
    alt="Dispensary Delivery"
  />
)

export const ShopExpandedMarker = () => (
  <img
    src={require('../static/images/pins/dispensary-expanded.svg')} // eslint-disable-line
    style={{ height: 113, width: 340 }}
    alt="Dispensary"
  />
)

export const LeafIcon = () => (
  <img
    src={require('../static/images/ic-leaf.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Dispensary"
  />
)

export const ManIcon = () => (
  <img
    src={require('../static/images/ic-man.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Service"
  />
)

export const VanIcon = () => (
  <img
    src={require('../static/images/ic-van.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Delivery"
  />
)

export const ShopIcon = () => (
  <img
    src={require('../static/images/ic-shop.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Delivery"
  />
)

export const InfluencerIcon = () => (
  <img
    src={require('../static/images/categories/influencer.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Influencer"
  />
)

export const OnlineShopIcon = () => (
  <img
    src={require('../static/images/ic-online.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Online"
  />
)

export const RetailIcon = () => (
  <img
    src={require('../static/images/categories/storefront.svg')} // eslint-disable-line
    style={{ height: 24, width: 24 }}
    alt="Retail"
  />
)

export const getNuglIcon = type => {
  switch (type) {
    case 'Service':
      return <ManIcon />
    case 'Store Front':
      return <ShopIcon />
    case 'Delivery':
      return <VanIcon />
    case 'Online':
      return <OnlineShopIcon />
    case 'Retail':
      return <RetailIcon />
    case 'Doctor':
      return <ManIcon />
    case 'Educator':
      return <ManIcon />
    case 'Lawyer':
      return <ManIcon />
    case 'Consultant':
      return <ManIcon />
    case 'Investor':
      return <ManIcon />
    case 'Marketing':
      return <ManIcon />
    case 'Security':
      return <ManIcon />
    case 'Other':
      return <ManIcon />

    default:
      return <LeafIcon />
  }
}

export const renderBusMarker = () => <BusMarker />

export const renderListingTypeMarker = (
  type,
  hover,
  selected,
  deliveryOnly,
  isDispensary,
  featured,
) => {
  let retailMarker = <RetailMarker featured={featured} />

  if (isDispensary) {
    retailMarker = <RetailDispensaryMarker featured={featured} />
  }

  if (deliveryOnly) {
    retailMarker = <ShopMarkerDelivery featured={featured} />
  }

  if (hover && !selected) {
    switch (type) {
      case BusinessTypes.RETAIL:
        return retailMarker
      case BusinessTypes.SERVICE:
        return <ServiceMarker featured={featured} />
      case BusinessTypes.BRAND:
        return <BrandMarker featured={featured} />
      case BusinessTypes.CANNABIS:
        return <ShopMarker featured={featured} />
      case BusinessTypes.INFLUENCER:
        return <InfluencerMarker featured={featured} />
      default:
        return <ShopMarker featured={featured} />
    }
  } else if (selected) {
    switch (type) {
      case BusinessTypes.RETAIL:
        return <ShopExpandedMarker />
      case BusinessTypes.SERVICE:
        return <ServiceExpandedMarker />
      case BusinessTypes.INFLUENCER:
        return <InfluencerExpandedMarker />
      default:
        return <ShopMarker />
    }
  } else {
    switch (type) {
      case BusinessTypes.RETAIL:
        return retailMarker
      case BusinessTypes.SERVICE:
        return <ServiceMarker featured={featured} />
      case BusinessTypes.BRAND:
        return <BrandMarker featured={featured} />
      case BusinessTypes.INFLUENCER:
        return <InfluencerMarker featured={featured} />
      default:
        return <ShopMarker featured={featured} />
    }
  }
}

export const renderListingTypeIcon = (type, hover) => {
  if (hover) {
    switch (type) {
      case BusinessTypes.SERVICE:
        return <ManIcon />
      case BusinessTypes.BRAND:
        return <LeafIcon />
      case BusinessTypes.INFLUENCER:
        return <InfluencerIcon />
      case BusinessTypes.RETAIL:
        return <RetailIcon />
      default:
        return <LeafIcon />
    }
  } else {
    return getNuglIcon(type)
  }
}

export const renderServiceTypeIcon = () => <ManIcon />

export const renderInfluencerTypeIcon = () => <InfluencerIcon />

export default {
  renderListingTypeIcon,
}
