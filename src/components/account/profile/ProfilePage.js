import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash.isequal'
import moment from 'moment'

import { mask } from '../../../util/MaskUtil'
import TabMenu from '../../common/TabsMenu'
import ProfileForm from './Form'
import {
  updateProfile,
  updateProfileImage,
} from '../../../store/actions/profileActions'
import { updatePassword, updateEmail } from '../../../store/actions/userActions'
import { firestore, storage, fieldValues } from '../../../firebase'
import { showLoading } from '../../../store/actions/loadingActions'
import { success, error } from '../../../store/actions/messageActions'
import UpdateDialog from '../../common/UpgradeDialog'
import URLSearchParams from 'url-search-params'

class ProfilePage extends Component {
  constructor(props) {
    super(props)
    const params = new URLSearchParams(props.location.search)
    const feature = params.get('feature')
    this.state = {
      saving: false,
      updateDialogOpen: feature === 'true' ? true : false,
      loaded: false,
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        displayName: '',
        birthday: '',
        phone: '',
        zip: '',
      },
      updateEmail: {
        newEmail: '',
        currentPassword: '',
        isEmailDirty: false,
      },
      updatePassword: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
      errors: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.state.user &&
      !isEqual(nextProps.user, this.state.user) &&
      (nextProps.user && nextProps.user.uid)
    ) {
      this.setState({ user: nextProps.user })
      if (!this.unsubscribeSnapshotListener) {
        this.unsubscribeSnapshotListener = this.registerSnapshotListener(
          nextProps.user.uid,
        )
      }
    }
    if (nextProps.profile && !isEqual(nextProps.profile, this.state.profile)) {
      this.setState({
        profile: nextProps.profile,
        updateEmail: {
          ...this.state.updateEmail,
          newEmail: nextProps.profile.email,
        },
      })
    }
  }

  componentDidMount() {
    const { user } = this.props
    if (user) {
      this.unsubscribeSnapshotListener = this.registerSnapshotListener(user.uid)
    }
  }

  componentWillMount() {
    const { profile } = this.props
    if (profile) {
      this.setState({
        profile,
        updateEmail: { ...this.state.updateEmail, newEmail: profile.email },
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribeSnapshotListener()
  }

  registerSnapshotListener = userId =>
    firestore
      .collection('profiles')
      .doc(userId)
      .onSnapshot(snapshot => {
        const data = snapshot.data()
        const profile = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          displayName: data.displayName,
          birthday: data.birthday,
          phone: data.phone,
          zip: data.zip,
        }
        this.setState({
          loaded: true,
          profile,
          updateEmail: { ...this.state.updateEmail, newEmail: profile.email },
        })
      })

  handleProfileTextChange = name => event => {
    let profile = { ...this.state.profile }
    profile[name] = mask(name, event.target.value)
    this.setState({ profile })
  }

  handleEmailChange = name => event => {
    const {
      profile: { email },
    } = this.state

    let updateEmail = { ...this.state.updateEmail }
    updateEmail[name] = mask(name, event.target.value)
    updateEmail.isEmailDirty = email !== updateEmail.newEmail
    this.setState({ updateEmail })
  }

  handleAccountTypeChange = accountType => () => {
    const uid = this.props.user.uid
    firestore
      .collection('profiles')
      .doc(uid)
      .set(
        {
          accountType: accountType,
          upgrading: true,
          tutorialCompletedOn: fieldValues.delete(),
        },
        { merge: true },
      )
  }

  handleUpgradeAccountClick = () => {
    this.setState({ updateDialogOpen: true })
  }

  handlePasswordTextChange = name => event => {
    let updatePassword = { ...this.state.updatePassword }
    updatePassword[name] = event.target.value
    this.setState({ updatePassword })
  }

  hideUpdateDialog = () => {
    this.setState({ updateDialogOpen: false })
  }

  fileStorageRef = () =>
    storage.ref(`users/${this.props.user ? this.props.user.uid : ''}`)

  handleUploadStart = () => this.setState({ saving: true })

  handleUploadError = error =>
    this.setState({ saving: false }) && console.error(error)

  handleUploadSuccess = async filename => {
    const url = await storage
      .ref(`users/${this.props.user.uid}`)
      .child(filename)
      .getDownloadURL()
    this.props.updateProfileImage(this.props.user.uid, url)
  }

  isValidProfile = () => {
    let isValid = true
    let errors = {}

    const validateTextField = (field, message) => {
      if (!this.state.profile[field] || this.state.profile[field] === '') {
        isValid = false
        errors[field] = message
      }
    }

    const validateDateField = (field, message) => {
      const textDate = this.state.profile[field]
      const fieldMoment = moment(textDate, 'MM-DD-YYYY')
      if (textDate && (textDate.length !== 10 || !fieldMoment.isValid())) {
        isValid = false
        errors[field] = message
      }
    }

    validateTextField('firstName', 'First Name is Required')
    validateTextField('lastName', 'Last Name is Required')
    validateTextField('displayName', 'Display Name is Required')

    if (this.state.profile.phone && this.state.profile.phone.length !== 14) {
      isValid = false
      errors.phone = 'Phone Number is not a Valid Format'
    }

    validateDateField('birthday', 'Birthday is not a Valid Format')

    if (this.state.profile.zip && this.state.profile.zip.length !== 5) {
      isValid = false
      errors.zip = 'Zip Code is not a Valid Format'
    }

    if (!isValid) {
      this.setState({ errors })
    } else {
      this.setState({ errors: {} })
    }

    return isValid
  }

  handleProfileSubmit = () => {
    if (this.isValidProfile()) {
      this.setState({ saving: true })
      const loadingMessage = {
        text: 'Your profile is being saved.',
        timeout: 2000,
      }
      this.props.showLoading(loadingMessage)
      const uid = this.props.user.uid
      const updateProfile = (uid, profile) => {
        this.props
          .updateProfile(uid, profile)
          .then(() => {
            this.setState({ saving: false })
            this.props.success('Profile successfully updated.')
          })
          .catch(() => {
            this.setState({ saving: false })
            this.props.error('Failed to update profile.')
          })
      }
      const { updateEmail } = this.state
      if (updateEmail.isEmailDirty) {
        this.props
          .updateEmail(updateEmail.newEmail, updateEmail.currentPassword)
          .then(() => {
            updateProfile(uid, {
              ...this.state.profile,
              email: updateEmail.newEmail,
            })
            this.setState({
              updateEmail: {
                currentPassword: '',
                isEmailDirty: false,
              },
            })
          })
          .catch(errorCode => {
            console.error(errorCode)
            this.setState({ saving: false })
            this.props.error('Failed to update your email address.')
          })
      } else {
        updateProfile(uid, { ...this.state.profile })
      }
    }
  }

  isValidUpdatePassword = () => {
    let isValid = true
    let errors = {}

    if (!isValid) {
      this.setState({ errors })
    } else {
      this.setState({ errors: {} })
    }

    return isValid
  }

  handlePasswordSubmit = () => {
    if (this.isValidUpdatePassword()) {
      this.props
        .updatePassword(
          this.state.updatePassword.currentPassword,
          this.state.updatePassword.newPassword,
        )
        .then(() => {
          this.setState({
            updatePassword: {
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            },
          })
          this.props.success('Password successfully updated.')
        })
    }
  }

  render() {
    const {
      handleEmailChange,
      handleProfileTextChange,
      handlePasswordTextChange,
      handleProfileSubmit,
      handlePasswordSubmit,
      handleUploadStart,
      handleUploadError,
      handleUploadSuccess,
      handleUpgradeAccountClick,
      fileStorageRef,
      hideUpdateDialog,
      state: {
        loaded,
        errors,
        profile,
        updatePassword,
        updateEmail,
        saving,
        updateDialogOpen,
      },
    } = this
    const { user } = this.props
    return (
      <div>
        <TabMenu profile={profile} />
        <ProfileForm
          user={user}
          profile={profile}
          updateEmail={updateEmail}
          updatePassword={updatePassword}
          onProfileTextChange={handleProfileTextChange}
          onPasswordTextChange={handlePasswordTextChange}
          onEmailChange={handleEmailChange}
          onProfileSubmit={handleProfileSubmit}
          onPasswordSubmit={handlePasswordSubmit}
          onUpgradeAccountClick={handleUpgradeAccountClick}
          onUploadStart={handleUploadStart}
          onUploadError={handleUploadError}
          handleUploadSuccess={handleUploadSuccess}
          fileStorageRef={fileStorageRef}
          saving={saving}
          errors={errors}
        />
        {loaded && profile ? (
          <UpdateDialog
            open={updateDialogOpen}
            onClose={hideUpdateDialog}
            profile={profile}
          />
        ) : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  }
}

export default connect(
  mapStateToProps,
  {
    updateProfile,
    updateProfileImage,
    updatePassword,
    updateEmail,
    showLoading,
    success,
    error,
  },
)(ProfilePage)
