import React, { Component } from 'react'
import { connect } from 'react-redux'
import geodist from 'geodist'

import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import ReviewDialog from '../ReviewDialog'
import ClaimDialog from '../ClaimDialog'
import { firestore } from '../../../firebase'
import { success, error } from '../../../store/actions/messageActions'
import { isCurrentlyOpen } from '../../../util/ListingUtil'

import Header from './Header'
import Title from './Title'
import Info from './Info'
import Contacts from './Contacts'

import styles from './styles'
import Messages from './messages'

class ListingPage extends Component {
  state = {
    tabIndex: 2,
    listing: {},
    reviewDialogOpen: false,
    claimDialogOpen: false,
    ratingsPopperEl: null,
    ratingsPopperOpen: false,
    errors: {},
    defaultCenter: {
      lat: 34.048432,
      lng: -118.443075,
    },
  }

  componentDidMount() {
    const { id } = this.props.match.params

    this.unsubscribeListingListener = this.registerListingSnapshotListener(id)
    this.unsubscribeReviewListener = this.registerReviewsSnapshotListener(id)
  }

  componentWillUnmount() {
    this.unsubscribeListingListener()
    this.unsubscribeReviewListener()
  }

  snapshotToListing = snapshot => {
    const { currentLocation } = this.props
    const listing = {
      id: snapshot.id,
      location: {
        latitude: 34.112091,
        longitude: 118.2153126,
      },
      ...snapshot.data(),
    }

    if (currentLocation && listing.location) {
      listing.distance = geodist(
        {
          lat: currentLocation.latitude,
          lon: currentLocation.longitude,
        },
        {
          lat: listing.location.latitude,
          lon: listing.location.longitude,
        },
        { exact: true, unit: 'miles' },
      ).toFixed(1)
    }

    return listing
  }

  registerListingSnapshotListener = listingId =>
    firestore
      .collection('services')
      .doc(listingId)
      .onSnapshot(snapshot => {
        const listing = this.snapshotToListing(snapshot)
        const ratings = this.getListingRatings(listing)
        this.setState({ listing, ratings })
      })

  registerReviewsSnapshotListener = listingId =>
    firestore
      .collection('reviews')
      .where('listingId', '==', listingId)
      .orderBy('createdOn', 'desc')
      .onSnapshot(snapshot => {
        let reviews = []
        snapshot.docs.forEach(review => {
          reviews.push({
            id: review.id,
            createdOn: review,
            ...review.data(),
          })
        })
        this.setState({
          reviews: reviews.sort((a, b) => {
            return new Date(b.createdOn) - new Date(a.createdOn)
          }),
        })
      })

  getReviewByUserIdAndListingId = (userId, listingId) =>
    firestore
      .collection('reviews')
      .where('userId', '==', userId)
      .where('listingId', '==', listingId)
      .get()

  addReview = review => firestore.collection('reviews').add(review)

  getListingRatings = listing => {
    const ratings = {}

    if (!listing.ratings) {
      return ratings
    }

    Object.keys(listing.ratings)
      .filter(e => e.indexOf('Average') > 0)
      .forEach(e => {
        ratings[e.replace('Average', '')] = listing.ratings[e]
      })

    return ratings
  }

  handleChangeTab = (event, value) =>
    this.setState({
      tabIndex: value,
    })

  handleReviewDialogOpen = open => () =>
    this.setState({
      reviewDialogOpen: open,
    })

  handleClaimDialogOpen = open => () => {
    const {
      user,
      history,
      location: { pathname },
    } = this.props

    if (user) {
      this.setState({
        claimDialogOpen: open,
      })
    } else {
      history.push(`/sign-in?returnUrl=${encodeURIComponent(pathname)}`)
    }
  }

  handleSubmitReview = review => {
    const { getReviewByUserIdAndListingId, addReview } = this

    const {
      success,
      error,
      user: { uid: userId },
      profile: { photoUrl, displayName },
    } = this.props

    const {
      listing: { id: listingId },
    } = this.state

    const reviewRequest = {
      listingId: listingId,
      userId: userId,
      userPhotoUrl: photoUrl,
      userDisplayName: displayName,
      createdOn: new Date(),
      collection: 'services',
      ...review,
    }

    getReviewByUserIdAndListingId(userId, listingId).then(snapshot => {
      const exists = snapshot.docs.length > 0
      const { allreadyReviewed, reviewSubmitted, reviewError } = Messages

      if (exists) {
        error(allreadyReviewed)
      } else {
        if (!reviewRequest.userPhotoUrl) {
          delete reviewRequest.userPhotoUrl
        }
        addReview(reviewRequest)
          .then(() => {
            success(reviewSubmitted)
          })
          .catch(() => {
            error(reviewError)
          })
      }
    })
  }

  handleSubmitClaim = claim => {
    const {
      success,
      user: { uid: userId },
    } = this.props

    const {
      listing: { id: listingId, name: listingName },
    } = this.state

    const { name, email, phone } = claim

    const ownershipRequest = {
      listingId: listingId,
      listingName: listingName,
      name: name,
      email: email,
      phone: phone,
      userId: userId,
      createdOn: new Date(),
      status: 'SUBMITTED',
    }

    const { ownershipRequested, ownershipError } = Messages

    firestore
      .collection('claims')
      .add(ownershipRequest)
      .then(() => {
        success(ownershipRequested)
      })
      .catch(error => {
        error(ownershipError)
        console.error(error)
      })
  }

  handleRatingsClick = open => event => {
    const { currentTarget } = event

    this.setState({
      ratingsPopperEl: currentTarget,
      ratingsPopperOpen: open,
    })
  }

  isListingLogo = listing => !!Object.keys(listing).length && listing.logo

  createServicesString = (type, services) =>
    type === 'Retail' ? [type, ...services].join(', ') : services.join(', ')

  getLocation = location =>
    location
      ? {
          lat: location.latitude,
          lng: location.longitude,
        }
      : null

  render() {
    const {
      isListingLogo,
      createServicesString,
      getLocation,
      handleRatingsClick,
      handleChangeTab,
      handleReviewDialogOpen,
      handleSubmitReview,
      handleClaimDialogOpen,
      handleSubmitClaim,
    } = this

    const { user, width, classes } = this.props

    const {
      tabIndex,
      listing,
      listing: {
        announcement,
        banner,
        userId,
        id,
        location: listingLocation,
        services: listingServices,
        type,
        logo,
        name,
        headline,
        description,
        ratings: listingRatings = {},
      },
      reviews = [],
      ratings,
      reviewDialogOpen,
      claimDialogOpen,
      ratingsPopperEl,
      ratingsPopperOpen,
      defaultCenter,
    } = this.state

    const { average = 0, count = 0 } = listingRatings

    const shareUrl = `https://app.nugl.com/services/${id}`
    const location = getLocation(listingLocation)
    const services = listing && listingServices ? listingServices : []
    const servicesString = createServicesString(type, services)
    const isOpen = isCurrentlyOpen(listing)
    const isBelowMedium = !isWidthUp('md', width)
    const isAboveMedium = isWidthUp('md', width)
    const isBelowSmall = !isWidthUp('sm', width)

    return (
      <div>
        <Header
          banner={banner}
          listing={listing}
          userId={userId}
          Button={Button}
          handleClaimDialogOpen={handleClaimDialogOpen}
          isListingLogo={isListingLogo}
          logo={logo}
        />

        <Title
          type={type}
          name={name}
          handleRatingsClick={handleRatingsClick}
          ratingsPopperOpen={ratingsPopperOpen}
          listingRatings={listingRatings}
          average={average}
          count={count}
          ratingsPopperEl={ratingsPopperEl}
          ratings={ratings}
          servicesString={servicesString}
          listing={listing}
          userId={userId}
          handleClaimDialogOpen={handleClaimDialogOpen}
          user={user}
          handleReviewDialogOpen={handleReviewDialogOpen}
        />

        <div className={classes.content}>
          <Info
            className={classes.leftContent}
            tabIndex={tabIndex}
            handleChangeTab={handleChangeTab}
            isBelowMedium={isBelowMedium}
            isAboveMedium={isAboveMedium}
            handleReviewDialogOpen={handleReviewDialogOpen}
            listing={listing}
            reviews={reviews}
            headline={headline}
            announcement={announcement}
            description={description}
            userId={userId}
            user={user}
            handleClaimDialogOpen={handleClaimDialogOpen}
          />

          <Contacts
            listing={listing}
            services={services}
            shareUrl={shareUrl}
            location={location}
            isOpen={isOpen}
            isBelowSmall={isBelowSmall}
            defaultCenter={defaultCenter}
          />
        </div>
        {reviewDialogOpen && (
          <ReviewDialog
            open={reviewDialogOpen}
            onClose={handleReviewDialogOpen(false)}
            onSubmit={handleSubmitReview}
          />
        )}
        {claimDialogOpen && (
          <ClaimDialog
            open={claimDialogOpen}
            onClose={handleClaimDialogOpen(false)}
            onSubmit={handleSubmitClaim}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
    currentLocation: state.currentLocation,
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { success, error },
  )(withWidth()(ListingPage)),
)
