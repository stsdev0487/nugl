import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'

import { renderListingTypeIcon } from '../../../../util/IconUtil'

import styles from './styles'

const CardButtons = ({ listing, classes }) => (
  <div className={classes.cardButtons}>
    {!(
      listing.type === 'Service' &&
      listing.services &&
      listing.services.length
    ) &&
      !(
        listing.type === 'Retail' &&
        listing.channels &&
        listing.channels.length
      ) && (
        <Tooltip id="tooltip-service" title={listing.type} placement="bottom">
          <div>
            <IconButton className={classes.cardButton} disabled>
              <div>{renderListingTypeIcon(listing.type)}</div>
            </IconButton>
          </div>
        </Tooltip>
      )}
    {listing.services &&
      listing.services.map(service =>
        true ? null : (
          <Tooltip
            id="tooltip-service"
            key={`service-icon-${listing.id}-${service}`}
            title={service}
            placement="bottom"
          >
            <div>
              <IconButton className={classes.cardButton} disabled>
                <div>{renderListingTypeIcon(service)}</div>
              </IconButton>
            </div>
          </Tooltip>
        ),
      )}
    {listing.channels &&
      listing.channels.map(channel => (
        <Tooltip
          id="tooltip-service"
          key={`service-icon-${listing.id}-${channel}`}
          title={channel}
          placement="bottom"
        >
          <div>
            <IconButton className={classes.cardButton} disabled>
              <div>{renderListingTypeIcon(channel)}</div>
            </IconButton>
          </div>
        </Tooltip>
      ))}
  </div>
)

export default withStyles(styles)(CardButtons)
