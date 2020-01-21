import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Popper from '../Popper'
import { renderListingTypeMarker } from '../../../util/IconUtil'

import styles from './styles'

class NuglMarker extends Component {
  anchorEl = null

  render() {
    const {
      result,
      result: {
        listing: { type, channels, services, featured },
      },
      $hover,
      hover,
      selected,
      onPopoverClose,
      onNavigateToListing,
      classes,
    } = this.props

    const isDispensary = services && services.indexOf('Dispensary') > -1
    const deliveryOnly =
      channels && channels.length === 1 && channels.indexOf('Delivery') > -1

    return (
      <div
        ref={node => (this.anchorEl = node)}
        className={selected ? classes.markerSelected : classes.marker}
      >
        {selected && (
          <Popper
            open={true}
            selected={selected}
            result={result}
            onPopoverClose={onPopoverClose}
            anchorEl={this.anchorEl}
            onNavigateToListing={onNavigateToListing}
          />
        )}
        {renderListingTypeMarker(
          type,
          $hover || hover,
          selected,
          deliveryOnly,
          isDispensary,
          featured,
        )}
      </div>
    )
  }
}

export default withStyles(styles)(NuglMarker)
