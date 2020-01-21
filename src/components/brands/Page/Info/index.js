import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import StarIcon from '@material-ui/icons/Star'
import Paper from '@material-ui/core/Paper'

import Reviews from '../../Reviews'
import Details from './Details'

import styles from './styles'

const Info = ({
  classes,
  tabIndex,
  handleChangeTab,
  reviews = [],
  user,
  brand,
  brand: {
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
  },
  handleReviewDialogOpen,
}) => (
  <div className={classes.content}>
    <Paper className={classes.paper}>
      <Tabs
        value={tabIndex}
        onChange={handleChangeTab}
        className={classes.tabs}
        centered
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Details" icon={<LocalOfferIcon />} />
        <Tab label="Reviews" icon={<StarIcon />} />
      </Tabs>
      <div>
        {tabIndex === 0 && (
          <Details
            id={id}
            phone={phone}
            email={email}
            website={website}
            description={description}
            facebook={facebook}
            twitter={twitter}
            instagram={instagram}
            linkedIn={linkedIn}
            linkedInType={linkedInType}
          />
        )}
        {tabIndex === 1 && (
          <Reviews
            brand={brand}
            reviews={reviews}
            user={user}
            onLeaveReviewClick={handleReviewDialogOpen}
          />
        )}
      </div>
    </Paper>
  </div>
)

export default withStyles(styles)(Info)
