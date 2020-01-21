import React, { Fragment } from 'react'
import Text from 'react-format-text'
import { BusinessTypeConsumer } from '../../../../BusinessContext'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemTextOriginal from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import Avatar from '../../../../../../common/Avatar'
import ListItemText from '../../../../../../common/ReversedListItemText'
import ListItemSecondaryAction from '../../../../../../common/ListItemSecondaryActionExtraMargin'
import {
  renderListingTypeIcon,
  getNuglIcon,
} from '../../../../../../../util/IconUtil'
import WorkingHours from './WorkingHours'
import Socials from './Socials'
import { nuglHost } from '../../../../../../../const/Paths'

import styles from './styles'

const Details = ({
  classes,
  business,
  business: {
    logoUrl,
    id,
    name,
    bannerUrl,
    headline,
    announcement,
    description,
    phone,
    email,
    website,
    formattedAddress,
    brands,
    services,
    type,
    amenities,
    hours,
    facebook,
    twitter,
    instagram,
    linkedIn,
    publish,
    channels,
    featured,
  },
  profile,
  handleClick,
  onPublishToggle,
  onFeatureToggle,
  handleDeleteDialogOpen,
}) => (
  <BusinessTypeConsumer>
    {contextProps => {
      return (
        <List className={classes.list}>
          <ListItem className={classes.listItem}>
            <div
              className={classes.logoPreviewCropped}
              style={{
                backgroundImage: `url(${logoUrl}`,
              }}
            >
              <IconButton
                className={classes.logoEditButton}
                onClick={handleClick('logo')}
              >
                <EditIcon />
              </IconButton>
            </div>

            <ListItemText
              primary={
                <a
                  className={classes.handle}
                  href={`${nuglHost}/${contextProps.collection}/${id}`}
                  target="_blank"
                >
                  @{id}
                </a>
              }
              secondary={<Typography variant="h6">{name}</Typography>}
            />
          </ListItem>
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Cover Photo</span>
            <IconButton onClick={handleClick('banner')}>
              <EditIcon />
            </IconButton>
          </ListSubheader>
          <ListItem className={classes.bannerListItem}>
            <img
              className={classes.banner}
              src={bannerUrl}
              alt="Upload a banner to help people recognize your company!"
            />
          </ListItem>
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Basic Info</span>
            <IconButton onClick={handleClick('business')}>
              <EditIcon />
            </IconButton>
          </ListSubheader>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={<Text>{headline}</Text>}
              secondary="Headline"
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={<Text>{announcement}</Text>}
              secondary="Announcement"
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={<Text>{description}</Text>}
              secondary="About"
            />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={phone} secondary="Phone" />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={email} secondary="Email" />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText primary={website} secondary="Website" />
          </ListItem>
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Location</span>
            <IconButton onClick={handleClick('address')}>
              <EditIcon />
            </IconButton>
          </ListSubheader>
          {formattedAddress && (
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={formattedAddress}
                secondary="Full Address"
              />
            </ListItem>
          )}
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Company Type</span>
          </ListSubheader>
          <ListItem className={classes.listItem}>
            <ListItemIcon>{renderListingTypeIcon(type)}</ListItemIcon>

            <ListItemText primary={type} />
          </ListItem>
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Services</span>
            <IconButton onClick={handleClick('services')}>
              <EditIcon />
            </IconButton>
          </ListSubheader>
          {services && services.length ? (
            services.sort().map(service => (
              <ListItem key={service} className={classes.listItem}>
                {type === 'Dispensary' && (
                  <ListItemIcon>{getNuglIcon(service)}</ListItemIcon>
                )}
                <ListItemText primary={service} />
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>
              <ListItemText secondary={'You have not added any services.'} />
            </ListItem>
          )}
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Connected Brands</span>
            <IconButton onClick={handleClick('brands')}>
              <EditIcon />
            </IconButton>
          </ListSubheader>
          {brands && brands.length ? (
            brands.sort().map(brand => (
              <ListItem key={brand.id} className={classes.listItem}>
                <Avatar
                  className={classes.brandAvatar}
                  source={brand.logoUrl}
                />
                <ListItemText primary={brand.name} />
              </ListItem>
            ))
          ) : (
            <ListItem className={classes.listItem}>
              <ListItemText secondary={'You have not added any brands.'} />
            </ListItem>
          )}
          {channels && (
            <Fragment>
              <ListSubheader className={classes.listHeader} disableSticky>
                <span>Sales Channels</span>
                <IconButton onClick={handleClick('channels')}>
                  <EditIcon />
                </IconButton>
              </ListSubheader>
              {channels && channels.length && business.channels ? (
                business.channels.map(channel => (
                  <ListItem key={channel} className={classes.listItem}>
                    <ListItemIcon>{getNuglIcon(channel)}</ListItemIcon>
                    <ListItemText primary={channel} />
                  </ListItem>
                ))
              ) : (
                <ListItem className={classes.listItem}>
                  <ListItemText
                    secondary={'You have not added any sales channels.'}
                  />
                </ListItem>
              )}
              {type === 'Retail' && (
                <Fragment>
                  <ListSubheader className={classes.listHeader} disableSticky>
                    <span>Amenities</span>
                    <IconButton onClick={handleClick('amenities')}>
                      <EditIcon />
                    </IconButton>
                  </ListSubheader>
                  {amenities && amenities.length ? (
                    amenities.map(amenity => (
                      <ListItem key={amenity} className={classes.listItem}>
                        <ListItemText primary={amenity} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem className={classes.listItem}>
                      <ListItemText
                        secondary={'You have not added any amenities.'}
                      />
                    </ListItem>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
          {hours && <WorkingHours handleClick={handleClick} hours={hours} />}
          <Socials
            handleClick={handleClick}
            facebook={facebook}
            twitter={twitter}
            instagram={instagram}
            linkedIn={linkedIn}
          />
          <ListSubheader className={classes.listHeader} disableSticky>
            <span>Settings</span>
          </ListSubheader>
          {profile && profile.role === 'admin' && (
            <Fragment>
              <ListItem>
                <ListItemTextOriginal
                  primary="Publish this business"
                  secondary={
                    <span className={classes.longSecondaryText}>
                      Published businesses will show up in search results and be
                      displayed on the map if a full address is entered.
                    </span>
                  }
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={publish}
                    onChange={onPublishToggle(business, Boolean(!publish))}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemTextOriginal
                  primary="Feature this profile"
                  secondary={
                    <span className={classes.longSecondaryText}>
                      Featured profiles will receive top placement in search
                      results with a more noticeable map pin.
                    </span>
                  }
                />
                <ListItemSecondaryAction>
                  <Switch
                    checked={featured}
                    onChange={onFeatureToggle(business, Boolean(!featured))}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </Fragment>
          )}
          <ListItem>
            <ListItemTextOriginal
              primary="Delete this business"
              secondary={
                <span className={classes.longSecondaryText}>
                  This is permanent. If we approve your request, there's no
                  going back.
                </span>
              }
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                className={classes.deleteButton}
                onClick={handleDeleteDialogOpen(true)}
              >
                Delete this listing
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      )
    }}
  </BusinessTypeConsumer>
)

export default withStyles(styles)(Details)
