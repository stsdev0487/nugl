import React, { Fragment } from 'react'

import { Icon } from 'react-fa'
import Text from 'react-format-text'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import WebIcon from '@material-ui/icons/Web'

import ListItemText from '../../../../common/ReversedListItemText'
import Sharing from '../../Sharing'

import styles from './styles'

const Details = ({
  classes,
  id,
  phone,
  email,
  website,
  description,
  facebook,
  twitter,
  instagram,
  linkedIn,
  linkedInType,
}) => {
  const shareUrl = `https://app.nugl.com/brands/${id}`

  return (
    <div>
      <List className={classes.list}>
        {phone && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <PhoneIcon className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText
              primary={
                <a className={classes.link} href={`tel:${phone}`}>
                  {phone}
                </a>
              }
              secondary="Phone"
            />
          </ListItem>
        )}

        {email && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <EmailIcon className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText
              primary={
                <a className={classes.link} href={`mailto:${email}`}>
                  {email}
                </a>
              }
              secondary="Email"
            />
          </ListItem>
        )}
        {website && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <WebIcon className={classes.listIcon} />
            </ListItemIcon>
            <ListItemText
              primary={
                <a
                  className={classes.link}
                  href={
                    website.indexOf('http://') >= 0
                      ? website
                      : `http://${website}`
                  }
                  target="_blank"
                >
                  {website}
                </a>
              }
              secondary="Website"
            />
          </ListItem>
        )}
        {description && (
          <Fragment>
            <ListSubheader className={classes.listHeader} disableSticky>
              <span>About Us</span>
            </ListSubheader>
            <ListItem className={classes.listItem}>
              <ListItemText primary={<Text>{description}</Text>} />
            </ListItem>
          </Fragment>
        )}
        {(facebook || twitter || instagram || linkedIn) && (
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Social Media</span>
          </ListSubheader>
        )}

        {facebook && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ListItemIcon>
                <Icon name="facebook" className={classes.faIcon} />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <a
                  className={classes.link}
                  href={`https://www.facebook.com/${facebook}`}
                  target="_blank"
                >{`${facebook}`}</a>
              }
              secondary="Facebook"
            />
          </ListItem>
        )}

        {twitter && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ListItemIcon>
                <Icon name="twitter" className={classes.faIcon} />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <a
                  className={classes.link}
                  href={`https://www.twitter.com/${twitter}`}
                  target="_blank"
                >{`${twitter}`}</a>
              }
              secondary="Twitter"
            />
          </ListItem>
        )}

        {instagram && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ListItemIcon>
                <Icon name="instagram" className={classes.faIcon} />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <a
                  className={classes.link}
                  href={`https://www.instagram.com/${instagram}`}
                  target="_blank"
                >{`${instagram}`}</a>
              }
              secondary="Instagram"
            />
          </ListItem>
        )}

        {linkedIn && (
          <ListItem className={classes.listItem}>
            <ListItemIcon>
              <ListItemIcon>
                <Icon name="linkedin" className={classes.faIcon} />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText
              primary={
                <a
                  className={classes.link}
                  href={`https://www.linkedin.com/${linkedInType ||
                    'in'}/${linkedIn}`}
                  target="_blank"
                >{`${linkedIn}`}</a>
              }
              secondary="LinkedIn"
            />
          </ListItem>
        )}

        <ListSubheader className={classes.listHeader} disableSticky>
          <span>Share This Page</span>
        </ListSubheader>

        <Sharing className={classes.listItem} shareUrl={shareUrl} />
      </List>
    </div>
  )
}

export default withStyles(styles)(Details)
