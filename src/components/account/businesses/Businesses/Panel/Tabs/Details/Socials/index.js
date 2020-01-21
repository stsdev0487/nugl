import React, { Fragment } from 'react'
import { Icon } from 'react-fa'

import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import EditIcon from '@material-ui/icons/Edit'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import ListSubheader from '@material-ui/core/ListSubheader'

import ListItemText from '../../../../../../../common/ReversedListItemText'

import styles from './styles'

const Socials = ({
  classes,
  handleClick,
  facebook,
  twitter,
  instagram,
  linkedIn,
}) => (
  <Fragment>
    <ListSubheader className={classes.listHeader} disableSticky>
      <span>Social Media</span>
      <IconButton onClick={handleClick('socialMedia')}>
        <EditIcon />
      </IconButton>
    </ListSubheader>
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <Icon name="facebook" className={classes.faIcon} />
      </ListItemIcon>
      <ListItemText primary={facebook} secondary="Facebook" />
    </ListItem>
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <Icon name="twitter" className={classes.faIcon} />
      </ListItemIcon>
      <ListItemText primary={twitter} secondary="Twitter" />
    </ListItem>
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <Icon name="instagram" className={classes.faIcon} />
      </ListItemIcon>
      <ListItemText primary={instagram} secondary="Instagram" />
    </ListItem>
    <ListItem className={classes.listItem}>
      <ListItemIcon>
        <Icon name="linkedin" className={classes.faIcon} />
      </ListItemIcon>
      <ListItemText primary={linkedIn} secondary="LinkedIn" />
    </ListItem>
  </Fragment>
)

export default withStyles(styles)(Socials)
