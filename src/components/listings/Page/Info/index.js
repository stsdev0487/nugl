import React, { Fragment } from 'react'
import Text from 'react-format-text'

import withWidth from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import PlaceIcon from '@material-ui/icons/Place'
import StarIcon from '@material-ui/icons/Star'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Typography from '@material-ui/core/Typography'

import Reviews from '../../Reviews'

import styles from './styles'

const Info = ({
  classes,
  tabIndex,
  handleChangeTab,
  isBelowMedium,
  isAboveMedium,
  handleReviewDialogOpen,
  listing,
  reviews,
  headline,
  announcement,
  description,
  userId,
  user,
  handleClaimDialogOpen,
}) => (
  <Paper className={classes.leftContent}>
    <div className={classes.tabContainer}>
      <Tabs
        value={tabIndex}
        onChange={handleChangeTab}
        className={classes.tabs}
        indicatorColor="primary"
        fullWidth={isBelowMedium || isAboveMedium}
        textColor="primary"
      >
        <Tab label="Reviews" className={classes.tab} icon={<StarIcon />} />
        <Tab label="Details" className={classes.tab} icon={<PlaceIcon />} />
      </Tabs>
      {user && listing.type === 'Retail' && (
        <Button
          className={classes.tabReviewButton}
          onClick={handleReviewDialogOpen(true)}
          variant="outlined"
          small="true"
          color="primary"
        >
          Leave Review
        </Button>
      )}
    </div>
    <div>
      {tabIndex === 0 && (
        <Reviews
          listing={listing}
          reviews={reviews}
          onLeaveReviewClick={handleReviewDialogOpen(true)}
          user={user}
        />
      )}

      {tabIndex === 1 && (
        <div className={classes.tabContainer}>
          {!description ? (
            <div className={classes.noMenuContent}>
              <Typography variant="h6" className={classes.noMenuTitle}>
                Looks like we haven't added any details yet!
              </Typography>
              <Typography variant="body1" className={classes.noMenuLine}>
                Please check back soon.
              </Typography>
            </div>
          ) : (
            <Fragment>
              {headline || announcement || description ? (
                <List className={classes.list}>
                  {headline && (
                    <Fragment>
                      <ListSubheader
                        className={classes.listHeader}
                        disableSticky
                      >
                        <span>Headline</span>
                      </ListSubheader>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={<Text>{headline}</Text>} />
                      </ListItem>
                    </Fragment>
                  )}
                  {announcement && (
                    <Fragment>
                      <ListSubheader
                        className={classes.listHeader}
                        disableSticky
                      >
                        <span>Announcement</span>
                      </ListSubheader>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={<Text>{announcement}</Text>} />
                      </ListItem>
                    </Fragment>
                  )}
                  {description && (
                    <Fragment>
                      <ListSubheader
                        className={classes.listHeader}
                        disableSticky
                      >
                        <span>About Us</span>
                      </ListSubheader>
                      <ListItem className={classes.listItem}>
                        <ListItemText primary={<Text>{description}</Text>} />
                      </ListItem>
                    </Fragment>
                  )}
                </List>
              ) : (
                <Fragment>
                  {listing && !userId && (
                    <div className={classes.emptyDetailsSection}>
                      <Typography
                        className={classes.emptyDetailsLine}
                        variant="h6"
                      >
                        Is this your business?
                      </Typography>
                      <Typography
                        className={classes.emptyDetailsLine}
                        variant="body1"
                      >
                        Respond to customer reviews and messages.
                      </Typography>
                      <Typography
                        className={classes.emptyDetailsLine}
                        variant="body1"
                      >
                        Claiming is free and only takes a minute.
                      </Typography>
                      <Button
                        onClick={handleClaimDialogOpen(true)}
                        variant="contained"
                        small="true"
                        color="secondary"
                      >
                        Claim this Business
                      </Button>
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      )}
    </div>
  </Paper>
)

export default withStyles(styles)(withWidth()(Info))
