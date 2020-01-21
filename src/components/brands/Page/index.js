import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import { firestore } from '../../../firebase'
import {
  success,
  error,
  customMessage,
} from '../../../store/actions/messageActions'

import ReviewDialog from '../ReviewDialog'
import Header from './Header'
import Title from './Title'
import Info from './Info'
import Messages from './messages'

import styles from './styles'

class BrandsPage extends PureComponent {
  defaultCenter = {
    lat: 34.048432,
    lng: -118.443075,
  }

  state = {
    tabIndex: 0,
    reviewDialogOpen: false,
    brand: {},
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props
    const brand = await this.getBrand(id)
    this.setState({
      brand,
    })
    this.unsubscribeBrandListener = this.registerBrandSnapshotListener(id)
    this.unsubscribeReviewListener = this.registerReviewsSnapshotListener(id)
  }

  async componentDidUpdate(prevProps) {
    if (prevProps === undefined) return false

    const {
      match: {
        params: { id: propsId },
      },
    } = this.props

    const {
      brand: { id: stateId },
    } = this.state

    if (stateId && stateId !== propsId) {
      const brand = await this.getBrand(propsId)
      this.setState({
        brand,
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribeBrandListener()
    this.unsubscribeReviewListener()
  }

  registerBrandSnapshotListener = brandId =>
    firestore
      .collection('brands')
      .doc(brandId)
      .onSnapshot(snapshot => {
        const brand = this.snapshotToBrand(snapshot)
        const ratings = this.getBrandRatings(brand)
        this.setState({
          brand,
          ratings,
          exists: snapshot.exists,
          loaded: true,
        })
      })

  registerReviewsSnapshotListener = brandId =>
    firestore
      .collection('reviews')
      .where('listingId', '==', brandId)
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

  snapshotToBrand = snapshot => {
    const brand = {
      id: snapshot.id,
      ...snapshot.data(),
    }
    return brand
  }

  getBrandRatings = brand => {
    const ratings = {}

    if (!brand.ratings) {
      return ratings
    }

    Object.keys(brand.ratings)
      .filter(e => e.indexOf('Average') > 0)
      .forEach(e => {
        ratings[e.replace('Average', '')] = brand.ratings[e]
      })

    return ratings
  }

  getBrand = async brandId => {
    const brandRef = await firestore
      .collection('brands')
      .doc(brandId)
      .get()

    const brand = {
      id: brandRef.id,
      ...brandRef.data(),
    }
    return brand
  }

  getReviewByUserIdAndBrandId = (userId, brandId) =>
    firestore
      .collection('reviews')
      .where('userId', '==', userId)
      .where('listingId', '==', brandId)
      .get()

  getListingsByUserId = userId =>
    firestore
      .collection('listings')
      .where('userId', '==', userId)
      .get()

  handleStoreListItemClick = listingId => () =>
    this.props.history.push(`/listings/${listingId}`)

  handleChangeTab = (event, value) => this.setState({ tabIndex: value })

  handleReviewDialogOpen = open => () =>
    this.setState({
      reviewDialogOpen: open,
    })

  addReview = review => firestore.collection('reviews').add(review)

  handleSubmitReview = review => {
    const { getReviewByUserIdAndBrandId, addReview } = this

    const {
      success,
      error,
      user: { uid: userId },
      profile: { photoUrl, displayName },
    } = this.props

    const {
      brand: { id: brandId },
    } = this.state

    const reviewRequest = {
      listingId: brandId,
      userId: userId,
      userPhotoUrl: photoUrl,
      userDisplayName: displayName,
      createdOn: new Date(),
      collection: 'brands',
      ...review,
    }

    getReviewByUserIdAndBrandId(userId, brandId)
      .then(snapshot => {
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
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {
      handleChangeTab,
      handleStoreListItemClick,
      handleReviewDialogOpen,
      handleSubmitReview,
    } = this

    const { user, currentLocation } = this.props

    const { tabIndex, brand, reviews, reviewDialogOpen } = this.state

    const currentUserHasLocation = Boolean(user)

    const brandRatings = brand.ratings || { count: 0, average: 0 }

    const { average = 0, count = 0 } = brandRatings

    return (
      <div>
        <Header brand={brand} />

        <Title
          currentUserHasLocation={currentUserHasLocation}
          brand={brand}
          handleReviewDialogOpen={handleReviewDialogOpen(true)}
          average={average}
          count={count}
          user={user}
        />

        <Info
          tabIndex={tabIndex}
          brand={brand}
          currentUserHasLocation={currentUserHasLocation}
          currentLocation={currentLocation}
          handleChangeTab={handleChangeTab}
          handleStoreListItemClick={handleStoreListItemClick}
          handleReviewDialogOpen={handleReviewDialogOpen(true)}
          reviews={reviews}
          user={user}
        />

        {reviewDialogOpen && (
          <ReviewDialog
            open={reviewDialogOpen}
            onClose={handleReviewDialogOpen(false)}
            onSubmit={handleSubmitReview}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    map: state.map,
    currentLocation: state.currentLocation,
    profile: state.profile,
  }
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { success, error, customMessage },
  )(BrandsPage),
)
