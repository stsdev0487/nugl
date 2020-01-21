import React, { Fragment } from 'react'
import GoogleMap from 'google-map-react'
import { Icon } from 'react-fa'
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from 'react-share'

import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import OriginalListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListSubheader from '@material-ui/core/ListSubheader'
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave'
import MapIcon from '@material-ui/icons/Map'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailIcon from '@material-ui/icons/Email'
import WebIcon from '@material-ui/icons/Web'
import Paper from '@material-ui/core/Paper'

import { renderListingTypeMarker, getNuglIcon } from '../../../../util/IconUtil'
import ListItemText from '../../../common/ReversedListItemText'
import ListingHours from './ListingHours'

import styles from './styles'

const Marker = ({ listing: { type } }) => (
  <div>{renderListingTypeMarker(type)}</div>
)

const Contacts = ({
  classes,
  listing,
  listing: {
    id,
    formattedAddress,
    address,
    city,
    state,
    zip,
    distance,
    phone,
    email,
    website,
    type,
    hours,
    facebook,
    twitter,
    instagram,
    linkedIn,
    linkedInType,
  },
  services,
  shareUrl,
  location,
  isOpen,
  isBelowSmall,
  defaultCenter,
}) => (
  <Paper className={classes.rightContent}>
    <div>
      <div className={classes.tabContainer}>
        {location && address && (
          <div className={classes.mapContainer}>
            <GoogleMap
              options={{
                panControl: false,
                mapTypeControl: false,
                scrollwheel: false,
              }}
              bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GOOGLE_API_KEY}`,
              }}
              center={location}
              defaultCenter={defaultCenter}
              defaultZoom={12}
            >
              <Marker
                key={`${id}`}
                lat={location.lat}
                lng={location.lng}
                listing={listing}
              />
            </GoogleMap>
          </div>
        )}

        <List className={classes.list} dense>
          {formattedAddress && (
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <MapIcon className={classes.listIcon} />
              </ListItemIcon>
              <OriginalListItemText
                primary={
                  <a
                    className={classes.link}
                    href={`http://maps.google.com/?q=${formattedAddress}`}
                  >
                    {address}
                  </a>
                }
                secondary={`${city}, ${state} ${zip}`}
              />
            </ListItem>
          )}

          {distance && address && (
            <ListItem className={classes.listItem}>
              <ListItemIcon>
                <TimeToLeaveIcon className={classes.listIcon} />
              </ListItemIcon>
              <ListItemText primary={`${distance} miles away`} />
            </ListItem>
          )}

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
              />
            </ListItem>
          )}

          {isBelowSmall && (
            <Fragment>
              <ListSubheader className={classes.listHeader} disableSticky>
                <span>Services</span>
              </ListSubheader>
              {services.map(service => (
                <ListItem key={service} className={classes.listItem}>
                  {type === 'Retail' && (
                    <ListItemIcon>{getNuglIcon(service)}</ListItemIcon>
                  )}
                  <ListItemText primary={service} />
                </ListItem>
              ))}
            </Fragment>
          )}

          <ListingHours dbHours={hours} classes={classes} isOpen={isOpen} />

          {(facebook || twitter || instagram || linkedIn) && (
            <ListSubheader className={classes.listHeader} disableSticky>
              <span>Follow Us</span>
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
              />
            </ListItem>
          )}

          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Share This Page</span>
          </ListSubheader>

          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <div className={classes.socialShareContainer}>
                  <FacebookShareButton
                    style={{
                      paddingTop: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: '50%',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    url={shareUrl}
                    round={true}
                    size={30}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      width="32"
                      height="32"
                      className="social-icon social-icon--facebook "
                    >
                      <g>
                        <circle cx="32" cy="32" r="31" fill="#3b5998" />
                      </g>
                      <g>
                        <path
                          d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </FacebookShareButton>
                  <TwitterShareButton
                    style={{
                      paddingTop: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: '50%',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    url={shareUrl}
                    round={true}
                    size={30}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      width="32"
                      height="32"
                      className="social-icon social-icon--twitter "
                    >
                      <g>
                        <circle cx="32" cy="32" r="31" fill="#00aced" />
                      </g>
                      <g>
                        <path
                          d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </TwitterShareButton>
                  <LinkedinShareButton
                    style={{
                      paddingTop: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: '50%',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    url={shareUrl}
                    round={true}
                    size={30}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      width="32"
                      height="32"
                      className="social-icon social-icon--linkedin "
                    >
                      <g>
                        <circle cx="32" cy="32" r="31" fill="#007fb1" />
                      </g>
                      <g>
                        <path
                          d="M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </LinkedinShareButton>
                  <EmailShareButton
                    style={{
                      paddingTop: 12,
                      paddingLeft: 12,
                      paddingRight: 12,
                      borderRadius: '50%',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    url={shareUrl}
                    round={true}
                    size={30}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      width="32"
                      height="32"
                      className="social-icon social-icon--email "
                    >
                      <g>
                        <circle cx="32" cy="32" r="31" fill="#7f7f7f" />
                      </g>
                      <g>
                        <path
                          d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </EmailShareButton>
                </div>
              }
            />
          </ListItem>
        </List>
      </div>
    </div>
  </Paper>
)

export default withStyles(styles)(withWidth()(Contacts))
