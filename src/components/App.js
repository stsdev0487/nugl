import React, { Component } from 'react'
import { instanceOf } from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { withCookies, Cookies } from 'react-cookie'
import { MuiThemeProvider } from '@material-ui/core/styles'
import NuglTheme from './NuglTheme'
import Header from './common/Header'
import Message from './common/Message'
import Loading from './common/Loading'
import ComplianceDialog from './common/ComplianceDialog'
// eslint-disable-next-line
import WelcomeDialog from './common/WelcomeDialog'
import CompanyPage from './company'
import SignInPage from './auth/SignInPage'
import SignUpPage from './auth/SignUpPage'
import ForgotPasswordPage from './auth/ForgotPasswordPage'
import MapPage from './map/MapPage'
import ListingsPage from './listings/Page'
import BrandsPage from './brands/Page'
import InfluencersPage from './listings/Page/InfluencerPage'
import ServicesPage from './listings/Page/ServicePage'
import AccountProfilePage from './account/profile/ProfilePage'
import AccountBusinessesPage from './account/businesses/Page'
import {
  updateProfile,
  receiveProfileFromSnapshot,
} from '../store/actions/profileActions'
import { setCenterPoint } from '../store/actions/mapActions'
import {
  setCurrentPointAndLocation,
  setCurrentLocation,
  setCurrentPoint,
  setCurrentTimeZone,
} from '../store/actions/currentLocationActions'
import GoogleApi from '../api/GoogleApi'
import GeolocationApi from '../api/GeolocationApi'
import { success, error, customMessage } from '../store/actions/messageActions'
import { firestore, fieldValues } from '../firebase'

//https://fontawesome.com/how-to-use/on-the-web/using-with/react
//https://www.npmjs.com/package/@fortawesome/fontawesome-free-brands
//import { library } from "@fortawesome/fontawesome-svg-core";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faGooglePlay } from "@fortawesome/fontawesome-free-brands";
//import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";
//library.add(faGooglePlay);
//library.add(faStroopwafel);
// <FontAwesomeIcon icon="google-play" />

class App extends Component {
  constructor(props) {
    super(props)
    const { cookies } = props
    this.state = {
      agree: Boolean(cookies.get('agree') || false),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && !this.unregisterProfileSnapshotListener) {
      this.unregisterProfileSnapshotListener = this.registerProfileSnapshotListener(
        nextProps.user.uid,
      )
    }
  }

  async componentDidMount() {
    const {
      setCenterPoint,
      setCurrentLocation,
      setCurrentPoint,
      setCurrentPointAndLocation,
      setCurrentTimeZone,
    } = this.props
    let point = null
    let currentLocation = await GeolocationApi.getCurrentLocation()
    if (currentLocation) {
      point = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      }
      setCenterPoint({
        lat: point.latitude,
        lng: point.longitude,
        city: currentLocation.city,
        region_code: currentLocation.region_code,
      })
      setCurrentPointAndLocation(currentLocation)
    } else {
      if (navigator.geolocation) {
        const currentLocation = await this.getCurrentPosition()
        const { latitude, longitude } = currentLocation.coords
        point = { latitude, longitude }
        setCenterPoint({
          lat: latitude,
          lng: longitude,
          city: currentLocation.city,
          region_code: currentLocation.state,
        })
        setCurrentPoint(point)
        this.getCurrentLocationFromGoogle({
          lat: latitude,
          lng: longitude,
        }).then(geocodeResults => {
          const city =
            geocodeResults[0].locality || geocodeResults[0].neighborhood
          const state = geocodeResults[0].administrative_area_level_1
          const zip = geocodeResults[0].postal_code
          setCurrentLocation({
            region_code: state,
            city,
            zip,
          })
        })
      }
    }
    if (point) {
      GoogleApi.timezoneSearch(point.latitude, point.longitude).then(
        timezone => {
          setCurrentTimeZone(timezone)
        },
      )
    }
  }

  componentWillUnmount() {
    const { unregisterProfileSnapshotListener } = this
    unregisterProfileSnapshotListener && unregisterProfileSnapshotListener()
  }

  loadGeolocationWithNavigator = () => {}

  getCurrentLocationFromIpStack = () => GeolocationApi.getCurrentLocation()

  getCurrentPosition = (
    options = { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true },
  ) => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  getCurrentLocationFromGoogle = point =>
    GoogleApi.geocodeSearch('address', `${point.lat},${point.lng}`)

  registerProfileSnapshotListener = userId => {
    return firestore
      .collection('profiles')
      .doc(userId)
      .onSnapshot(snapshot => {
        if (snapshot.exists) {
          let profile = { ...snapshot.data() }
          this.props.receiveProfileFromSnapshot(profile)
        }
      })
  }

  setAccountType = accountType => {
    const { user, profile } = this.props
    let newProfile = {
      accountType,
      tutorialCompletedOn: new Date(),
    }
    if (profile && !profile.createdOn) {
      newProfile.createdOn = user.creationTime
    }
    if (profile && !profile.email) {
      newProfile.email = user.email
    }
    if (profile && !profile.displayName) {
      newProfile.displayName = 'anonymous'
    }
    if (profile && profile.upgrading) {
      newProfile.upgrading = fieldValues.delete()
    }
    this.props.updateProfile(user.uid, newProfile)
  }

  handleAgreement = () => {
    const { cookies } = this.props
    cookies.set('agree', true)
    this.setState({ agree: true })
  }

  renderPersonalWelcomeMessage = () => {
    return (
      <div>
        <span>
          Thanks for creating your account!
          <br />
          To complete your NUGL profile, visit your{' '}
          <Link to="/account/">account page</Link>.
        </span>
      </div>
    )
  }

  handleCompleteWelcome = accountType => {
    if (accountType === 'personal') {
      this.props.customMessage(this.renderPersonalWelcomeMessage())
    }
    this.setAccountType(accountType)
  }

  render() {
    const { loading, profile, user } = this.props
    const { agree } = this.state
    // eslint-disable-next-line
    const { pathname, search } = window.location
    // eslint-disable-next-line
    const showWelcomeDialog =
      agree && (profile && !Boolean(profile && profile.tutorialCompletedOn))
    return (
      <MuiThemeProvider theme={NuglTheme}>
        <BrowserRouter>
          <div>
            <Header />
            {user ? (
              <Switch>
                <Route exact path="/" component={MapPage} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPasswordPage}
                />
                <Route exact path="/account" component={AccountProfilePage} />
                <Route exact path="/account/" component={AccountProfilePage} />
                <Route
                  exact
                  path="/account/profiles"
                  component={AccountBusinessesPage}
                />
                <Route exact path="/listings/:id" component={ListingsPage} />
                <Route exact path="/brands/:id" component={BrandsPage} />
                <Route exact path="/services/:id" component={ServicesPage} />
                <Route
                  exact
                  path="/influencers/:id"
                  component={InfluencersPage}
                />
                <Route
                  exact
                  path="/company/:companyId"
                  component={CompanyPage}
                />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={MapPage} />
                <Route exact path="/sign-in" component={SignInPage} />
                <Route exact path="/sign-up" component={SignUpPage} />
                <Route
                  exact
                  path="/forgot-password"
                  component={ForgotPasswordPage}
                />
                <Route exact path="/listings/:id" component={ListingsPage} />
                <Route exact path="/brands/:id" component={BrandsPage} />
                <Route exact path="/services/:id" component={ServicesPage} />
                <Route
                  exact
                  path="/influencers/:id"
                  component={InfluencersPage}
                />
                <Route
                  exact
                  path="/company/:companyId"
                  component={CompanyPage}
                />
                <Route component={SignInPage} />
              </Switch>
            )}
            {loading && <Loading />}
            <Message />
            <ComplianceDialog
              open={!agree}
              onAgreement={this.handleAgreement}
            />
            {/*showWelcomeDialog && (
                            <WelcomeDialog
                                accountType={profile.accountType}
                                upgrading={profile.upgrading}
                                open={showWelcomeDialog}
                                onClose={this.handleCompleteWelcome}
                            />
                        )*/}
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
}

function mapStateToProps(state) {
  return {
    loading: state.loading.loading,
    user: state.user,
    map: state.map,
    profile: state.profile,
  }
}

export default connect(
  mapStateToProps,
  {
    updateProfile,
    receiveProfileFromSnapshot,
    setCenterPoint,
    setCurrentPointAndLocation,
    setCurrentLocation,
    setCurrentPoint,
    setCurrentTimeZone,
    customMessage,
    success,
    error,
  },
)(withCookies(App))
