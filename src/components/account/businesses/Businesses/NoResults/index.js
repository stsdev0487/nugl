import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import StoreIcon from '../../../../../static/images/categories/storefront.svg'

import styles from './styles'

const NoResults = ({ onAddBusinessDialogOpen, classes }) => (
  <div className={classes.main}>
    <img src={StoreIcon} className={classes.iconFamily} alt="Types" />
    <Typography variant="headline" className={classes.center} gutterBottom>
      Create your public profile.
    </Typography>
    <Typography variant="subtitle1" className={classes.center} gutterBottom>
      Here you can add your personal or business profile to your account.
    </Typography>
    <div className={classes.actions}>
      <Button
        variant="contained"
        color="primary"
        onClick={onAddBusinessDialogOpen}
        className={classes.button}
      >
        Create my Profile
      </Button>
    </div>
  </div>
)

export default withStyles(styles)(NoResults)
