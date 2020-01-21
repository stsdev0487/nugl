import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '../../../common/Avatar'

import styles from './styles'

const BrandsHeader = ({ brand: { bannerUrl, logoUrl }, classes }) => (
  <div
    className={classes.banner}
    style={{
      backgroundImage: `url(${bannerUrl}`,
    }}
  >
    <div className={classes.gradient} />
    <Avatar className={classes.avatar} source={logoUrl} />
    <div className={classes.header} />
  </div>
)

export default withStyles(styles)(BrandsHeader)
