import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { BusinessTypeProvider } from '../BusinessContext'
import { getTypeFromName } from '../../../../const/BusinessTypes'
import BusinessDialog from '../CreateDialog'
import ContextSelectDialog from '../ContextSelectDialog'
import LoadingIndicator from '../../../common/LoadingIndicator'
import TabMenu from '../../../common/TabsMenu'
import Businesses from '../Businesses'
import { success, error } from '../../../../store/actions/messageActions'
import { setCenterPoint } from '../../../../store/actions/mapActions'
import {
  showLoading,
  hideLoading,
} from '../../../../store/actions/loadingActions'
import { firestore, storage, fieldValues } from '../../../../firebase'
import UploadApi from '../../../../api/UploadApi'
import { Subtypes } from '../../../../const/BusinessTypes'

const getCategoryWithMostProfiles = profile => {
  if (profile && profile.profilesCount) {
    let names = Object.keys(profile.profilesCount)
      .map(e => ({ name: e, value: profile.profilesCount[e] }))
      .sort((a, b) => {
        return b.value - a.value
      })
    return names[0].name
  }
  return 'listings'
}

class BusinessesPage extends Component {
  constructor(props) {
    super(props)
    let defaultBusinessType = getCategoryWithMostProfiles(props.profile)
    this.state = {
      businessType: getTypeFromName(defaultBusinessType),
      loading: true,
      addBusinessDialogOpen: false,
      contextSelectDialogOpen: false,
      selectedBusiness: null,
      businesses: null,
    }
  }

  componentDidMount() {
    const { user } = this.props
    if (user) {
      this.setState({ loading: true })
      this.unsubscribeSnapshotListener = this.registerSnapshotListener(user.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user, profile } = this.props
    if (!user && nextProps.user) {
      if (!this.unsubscribeSnapshotListener) {
        this.setState({ loading: true })
        this.unsubscribeSnapshotListener = this.registerSnapshotListener(
          nextProps.user.uid,
        )
      }
    }
    if (!profile && nextProps.profile) {
      this.handleContextSwitch(
        getTypeFromName(getCategoryWithMostProfiles(nextProps.profile)).type,
      )
    }
  }

  componentWillUnmount() {
    this.unsubscribeSnapshotListener()
  }

  getBusinessByUserId = userId =>
    firestore
      .collection(this.state.businessType.collection)
      .where('userId', '==', userId)
      .get()

  setBusinessPublishById = (businessId, publish) =>
    firestore
      .collection(this.state.businessType.collection)
      .doc(businessId)
      .set({ publish }, { merge: true })

  setBusinessFeaturedById = (businessId, featured) =>
    firestore
      .collection(this.state.businessType.collection)
      .doc(businessId)
      .set({ featured }, { merge: true })

  setBusiness = (id, business) => {
    return firestore
      .collection(this.state.businessType.collection)
      .doc(id)
      .set(business, { merge: true })
  }

  getReviewsByBusinessId = businessId =>
    firestore
      .collection('reviews')
      .where(`${this.state.businessType.singular}Id`, '==', businessId)
      .get()

  getConnectionsByBusinessId = businessId =>
    firestore
      .collection('connections')
      .where(`listingId`, '==', businessId)
      .get()

  addRemoveBusinessRequest = request =>
    firestore.collection('removals').add(request)

  removeBusinessToBrandConnection = async (business, brand) => {
    const { user } = this.props
    const connectionsSnapshot = await firestore
      .collection('connections')
      .where('listingId', '==', business.id)
      .where('brandId', '==', brand.id)
      .get()
    connectionsSnapshot.forEach(connectionSnapshot => {
      connectionSnapshot.ref.delete().then(() => {
        this.unsubscribeSnapshotListener = this.registerSnapshotListener(
          user.uid,
        )
      })
    })
  }

  connectBusinessToBrand = (business, brand) => {
    const { user } = this.props
    const connection = {
      userId: user.uid,
      createdOn: new Date(),
      brandId: brand.id,
      brandRef: firestore.collection('brands').doc(brand.id),
      listingId: business.id,
      listingRef: firestore
        .collection(this.state.businessType.collection)
        .doc(business.id),
    }
    return firestore
      .collection('connections')
      .add(connection)
      .then(() => {
        this.unsubscribeSnapshotListener = this.registerSnapshotListener(
          user.uid,
        )
      })
  }

  addPhotoToStorage = (businessId, photo) => {
    UploadApi.uploadImage(
      this.state.businessType.collection,
      businessId,
      photo.file,
    )
    const uploadResult = storage
      .ref()
      .child(
        `${this.state.businessType.collection}/${businessId}/${photo.file.name}`,
      )
      .put(photo.file)
    return uploadResult.then(snapshot => {
      return snapshot.ref.getDownloadURL().then(url => {
        return Promise.resolve(url)
      })
    })
  }

  registerSnapshotListener = userId =>
    firestore
      .collection(this.state.businessType.collection)
      .where('userId', '==', userId)
      .onSnapshot(async snapshot => {
        const promises = await snapshot.docs.map(async doc => {
          return await this.snapshotToBusiness(doc)
        })
        const businesses = await Promise.all(promises)
        if (this.state.selectedBusiness) {
          const updatedSelectedBusiness = businesses.filter(
            e => e.id === this.state.selectedBusiness.id,
          )[0]
          if (updatedSelectedBusiness) {
            this.updateSelectedBusiness(updatedSelectedBusiness)
          }
        }
        this.setState({
          businesses,
          loading: false,
        })
      })

  snapshotToBusiness = async snapshot => {
    const business = {
      id: snapshot.id,
      ...snapshot.data(),
    }
    business.reviewsCount = business.ratings ? business.ratings.count : 0
    const connectionsQuerySnapshot = await this.getConnectionsByBusinessId(
      business.id,
    )
    const connections = await Promise.all(
      connectionsQuerySnapshot.docs.map(async e => {
        const connection = { id: e.id, ...e.data() }
        const brandSnapshot = await connection.brandRef.get()
        connection.brand = { id: brandSnapshot.id, ...brandSnapshot.data() }
        return connection
      }),
    )
    business.brands = connections.map(e => e.brand)
    return business
  }

  goto = path => {
    this.props.history.push(path)
  }

  handlePublishToggle = (business, publish) => () => {
    this.setBusinessPublishById(business.id, publish)
      .then(() => {
        const message = publish
          ? 'Your location has been published to the map.'
          : 'Your business has been removed from the search results and map.'
        this.props.success(message)
      })
      .catch(() => {
        this.props.error('There was an error saving your business.')
      })
  }

  handleFeatureToggle = (business, featured) => () => {
    this.setBusinessFeaturedById(business.id, featured)
      .then(() => {
        const message = featured
          ? 'Your profile has been featured.'
          : 'Your profile is no longer featured.'
        this.props.success(message)
      })
      .catch(() => {
        this.props.error('There was an error saving your business.')
      })
  }

  handleAddBusinessDialogClose = () =>
    this.setState({ addBusinessDialogOpen: false })

  handleAddBusinessDialogOpen = () =>
    this.setState({ addBusinessDialogOpen: true })

  handleContextSelectDialogClose = () =>
    this.setState({ contextSelectDialogOpen: false })

  handleContextSelectDialogOpen = () =>
    this.setState({ contextSelectDialogOpen: true })

  handleBusinessAndContextDialogClose = () =>
    this.setState({
      addBusinessDialogOpen: false,
      contextSelectDialogOpen: false,
    })

  handleMapButtonClick = (location, id) => () => {
    const { setCenterPoint, currentLocation } = this.props
    setCenterPoint(
      {
        lat: location._lat,
        lng: location._long,
        city: currentLocation.city,
        region_code: currentLocation.region_code,
      },
      id,
    )
    this.goto('/')
  }

  updateSelectedBusiness = business => {
    this.setState({ selectedBusiness: business })
  }

  handleBusinessClick = business => () => {
    this.setState({ selectedBusiness: business })
  }

  handleBackClick = () => {
    this.setState({ selectesBusiness: null })
  }

  handleContextSwitch = businessType => {
    const newContext = Subtypes.filter(e => e.type === businessType)[0]
    this.setState({ businessType: newContext }, () => {
      if (this.unsubscribeSnapshotListener) {
        this.unsubscribeSnapshotListener()
      }
      this.setState({ businessType: newContext }, () => {
        const { user } = this.props
        if (user) {
          this.setState({ selectedBusiness: null, loading: true })
          this.unsubscribeSnapshotListener = this.registerSnapshotListener(
            user.uid,
          )
        }
      })
    })
  }

  handleContextSelectSubmit = businessType => {
    this.handleContextSwitch(businessType)
    this.handleContextSelectDialogClose()
    this.handleAddBusinessDialogOpen()
  }

  handleSubmit = (business, logo, banner) => {
    const { user, showLoading, hideLoading } = this.props
    const { id } = business
    const newBusiness = { ...business }
    newBusiness.userId = user.uid

    if (business.createdOn) {
      delete newBusiness.createdOn
    } else {
      newBusiness.createdOn = fieldValues.serverTimestamp()
    }

    // Don't save these
    delete newBusiness.id
    delete newBusiness.logo
    delete newBusiness.banner
    delete newBusiness.logoUrl
    delete newBusiness.bannerUrl

    const loadingMessage = {}
    if (logo || banner) {
      loadingMessage.text =
        'We are currently processing your uploaded images...'
    } else {
      loadingMessage.text = 'We are saving your business to our database...'
    }

    showLoading(loadingMessage)

    return this.setBusiness(id, newBusiness)
      .then(() => {
        if (logo || banner) {
          Promise.all([
            logo ? this.addPhotoToStorage(business.id, logo) : null,
            banner ? this.addPhotoToStorage(business.id, banner) : null,
          ])
            .then(urlResults => {
              let photos = {}

              if (urlResults[0]) {
                photos.logoUrl = urlResults[0]
              }

              if (urlResults[1]) {
                photos.bannerUrl = urlResults[1]
              }

              this.setBusiness(id, photos).then(() => {
                this.handleAddBusinessDialogClose()
                hideLoading()
              })
            })
            .catch(err => {
              hideLoading()
              this.props.error('There was an error saving your Business.')
              throw err
            })
        } else {
          this.handleAddBusinessDialogClose()
          hideLoading()
        }
      })
      .catch(err => {
        this.props.error('There was an error saving your Business.')
        throw err
      })
  }

  handleSubmitRemoval = removalRequest => {
    const { user, profile } = this.props
    if (profile.firstName && profile.lastName) {
      removalRequest.name = `${profile.firstName} ${profile.lastName}`
    } else {
      removalRequest.name = 'No first and last name provided'
    }
    removalRequest.email = user.email
    removalRequest.phone = profile.phone || 'No phone number provided'
    removalRequest.type = 'Business'
    this.addRemoveBusinessRequest(removalRequest)
      .then(() => {
        this.props.success(
          'Request submitted. We will review your case and contact you shortly.',
        )
      })
      .catch(() => {
        this.props.error('There was an error submitting your removal request.')
      })
  }

  handleBackClick = () => {
    this.setState({ selectedBusiness: null })
  }

  render() {
    const { handleBackClick } = this
    const { profile, user } = this.props
    const {
      loading,
      businesses,
      selectedBusiness,
      addBusinessDialogOpen,
      contextSelectDialogOpen,
    } = this.state

    return (
      <BusinessTypeProvider value={this.state.businessType}>
        <div>
          <TabMenu profile={profile} />
          {loading ? (
            <LoadingIndicator />
          ) : (
            <Fragment>
              <Businesses
                selectedBusiness={selectedBusiness}
                updateSelectedBusiness={this.updateSelectedBusiness}
                onBusinessClick={this.handleBusinessClick}
                businesses={businesses}
                onBackClick={handleBackClick}
                onAddBusinessDialogOpen={this.handleContextSelectDialogOpen}
                onMapButtonClick={this.handleMapButtonClick}
                onPublishToggle={this.handlePublishToggle}
                onFeatureToggle={this.handleFeatureToggle}
                onSubmit={this.handleSubmit}
                onSubmitRemoval={this.handleSubmitRemoval}
                goto={this.goto}
                onContextSwitch={this.handleContextSwitch}
                removeBusinessToBrandConnection={
                  this.removeBusinessToBrandConnection
                }
                connectBusinessToBrand={this.connectBusinessToBrand}
              />
            </Fragment>
          )}
          <ContextSelectDialog
            open={contextSelectDialogOpen}
            onClose={this.handleContextSelectDialogClose}
            onSubmit={this.handleContextSelectSubmit}
          />
          <BusinessDialog
            open={addBusinessDialogOpen}
            onClose={this.handleAddBusinessDialogClose}
            onSubmit={this.handleSubmit}
            onBusinessClick={this.handleBusinessClick}
            userId={user ? user.uid : ''}
          />
        </div>
      </BusinessTypeProvider>
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

export default withRouter(
  connect(
    mapStateToProps,
    {
      setCenterPoint,
      showLoading,
      hideLoading,
      success,
      error,
    },
  )(BusinessesPage),
)
