import React from 'react'

import Details from './Details'

const BusinessesTabs = ({
  tab,
  business,
  profile,
  handleClick,
  onPublishToggle,
  onFeatureToggle,
  handleDeleteDialogOpen,
  userId,
}) => {
  const tabs = [
    business ? (
      <Details
        business={business}
        userId={userId}
        profile={profile}
        handleClick={handleClick}
        onPublishToggle={onPublishToggle}
        onFeatureToggle={onFeatureToggle}
        handleDeleteDialogOpen={handleDeleteDialogOpen}
      />
    ) : null,
  ]

  return tabs[tab]
}

export default BusinessesTabs
