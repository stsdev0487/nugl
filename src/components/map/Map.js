import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

class NuglGoogleMap extends Component {
  static defaultProps = {
    markers: [],
    zoom: 12,
  }

  createMapOptions = maps => ({
    panControl: false,
    mapTypeControl: false,
    scrollwheel: true,
  })

  handleChildClick = e => {
    const { onMarkerClick } = this.props

    if (onMarkerClick) onMarkerClick(e)
  }

  handleChildMouseEnter = shopId => {
    const { onMarkerMouseEnter } = this.props

    if (onMarkerMouseEnter) onMarkerMouseEnter(shopId)
  }

  handleChildMouseLeave = shopId => {
    const { onMarkerMouseLeave } = this.props

    if (onMarkerMouseLeave) onMarkerMouseLeave(shopId)
  }

  handleBoundsChanged = info => {
    const { onBoundsChange } = this.props

    if (onBoundsChange) onBoundsChange(info)
  }

  render() {
    const {
      createMapOptions,
      handleBoundsChanged,
      handleChildClick,
      handleChildMouseEnter,
      handleChildMouseLeave,
    } = this

    const { center, defaultCenter, zoom, children } = this.props

    const { REACT_APP_GOOGLE_API_KEY: apiKey } = process.env

    return (
      <GoogleMap
        options={createMapOptions}
        bootstrapURLKeys={{
          key: `${apiKey}`,
        }}
        center={center}
        defaultCenter={defaultCenter}
        defaultZoom={zoom}
        onChange={handleBoundsChanged}
        onChildClick={handleChildClick}
        onChildMouseEnter={handleChildMouseEnter}
        onChildMouseLeave={handleChildMouseLeave}
      >
        {children}
      </GoogleMap>
    )
  }
}

export default NuglGoogleMap
