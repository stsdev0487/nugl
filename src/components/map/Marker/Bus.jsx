import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

import Popper from '../Popper/Bus'
import { renderBusMarker } from '../../../util/IconUtil'

import styles from './styles'

class BusMarker extends Component {
  anchorEl = null

  render() {
    const {
      result,
      selected,
      onPopoverClose,
      onNavigateToListing,
      classes,
    } = this.props

    return (
      <div
        style={{ maxWidth: '300px' }}
        className={selected ? classes.markerSelected : classes.marker}
      >
        {selected && (
          <Popper
            open
            selected={selected}
            result={result}
            onPopoverClose={onPopoverClose}
            anchorEl={this.anchorEl}
            onNavigateToListing={onNavigateToListing}
          />
        )}
        {renderBusMarker()}
      </div>
    )
  }
}

export default withStyles(styles)(BusMarker)
