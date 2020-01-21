import React from 'react'

import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

import { renderListingTypeIcon, getNuglIcon } from '../../../../util/IconUtil'

import styles from './styles'

const DispensaryContent = ({ listing: { type, services }, classes }) => {
  return (
    <div className={classes.cardButtons}>
      <IconButton className={classes.cardButton} disabled>
        <div>{renderListingTypeIcon(type)}</div>
      </IconButton>
      {services && services.indexOf('Delivery') >= 0 && (
        <div>
          <IconButton className={classes.cardButton} disabled>
            <div>{getNuglIcon('Delivery')}</div>
          </IconButton>
        </div>
      )}
      {services && services.indexOf('Store Front') >= 0 && (
        <div>
          <IconButton className={classes.cardButton} disabled>
            <div>{getNuglIcon('Store Front')}</div>
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(DispensaryContent)
