import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CircularProgress from '@material-ui/core/CircularProgress'
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton'

import Avatar from '../../../common/Avatar'

import Man from '../../../../static/images/man-with-pink-shirt.png'

import styles from './styles'

const ProfileForm = ({
  user,
  profile,
  updateEmail,
  updatePassword,
  onProfileTextChange,
  onPasswordTextChange,
  onEmailChange,
  onUpgradeAccountClick,
  handleUploadStart,
  handleUploadError,
  handleUploadSuccess,
  fileStorageRef,
  onProfileSubmit,
  onPasswordSubmit,
  saving,
  errors,
  classes,
}) => (
  <div className={classes.main}>
    <div className={classes.photoSection}>
      <Avatar
        source={user && user.photoURL ? user.photoURL : Man}
        className={classes.avatar}
      />
      <CustomUploadButton
        accept="image/*"
        name="profile"
        randomizeFilename
        storageRef={fileStorageRef()}
        onUploadStart={handleUploadStart}
        onUploadError={handleUploadError}
        onUploadSuccess={handleUploadSuccess}
        style={{
          cursor: 'pointer',
          border: '1px solid rgba(0, 161, 228, 0.5)',
          backgroundColor: '#FFFFFF',
          color: '#00A1E4',
          padding: '5px 16px',
          borderRadius: 20,
        }}
      >
        <Typography
          className={classes.uploadButtonText}
          color="primary"
          variant="button"
        >
          Upload Account Photo
        </Typography>
      </CustomUploadButton>
    </div>

    <Paper className={classes.paper}>
      <div className={classes.sideMargins}>
        <div className={classes.header}>
          <Typography variant="h6" gutterBottom>
            Account Info
          </Typography>
          {profile && profile.accountType !== 'featured' && (
            <Button
              className={classes.upgradeButton}
              color="secondary"
              variant="raised"
              onClick={onUpgradeAccountClick}
            >
              Upgrade your Account
            </Button>
          )}
        </div>
        <Divider className={classes.bottomMargin} light />
        <Typography variant="caption" gutterBottom>
          Only your Display Name and Account Photo will be visible to others.
          The rest of your information will remain private.
        </Typography>
      </div>
      <div className={classes.section}>
        <div className={classes.sectionForm}>
          <div className={classes.inputContainer}>
            <TextField
              id="firstName"
              label="First Name"
              className={classes.sideMargins}
              value={profile.firstName || ''}
              onChange={onProfileTextChange('firstName')}
              error={!!errors.firstName}
              helperText={errors.firstName}
              margin="normal"
              fullWidth
            />
            <TextField
              id="lastName"
              label="Last Name"
              className={classes.sideMargins}
              value={profile.lastName || ''}
              onChange={onProfileTextChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              margin="normal"
              fullWidth
            />
          </div>
          {updateEmail && (
            <Fragment>
              <div className={classes.inputContainer}>
                <TextField
                  id={`email-${new Date().getMilliseconds()}`}
                  label="Email Address"
                  autoComplete="off"
                  className={classes.sideMargins}
                  onChange={onEmailChange('newEmail')}
                  value={updateEmail.newEmail || ''}
                  helperText={
                    'Updating your email address will require you to enter your password.'
                  }
                  margin="normal"
                  fullWidth
                  inputProps={{
                    autoComplete: 'off',
                  }}
                />
              </div>
              {updateEmail.isEmailDirty && (
                <div className={classes.inputContainer}>
                  <TextField
                    id={`currentPasswordForEmail-${new Date().getMilliseconds()}`}
                    label="Current Password"
                    style={{ margin: 8 }}
                    className={classes.sideMargins}
                    onChange={onEmailChange('currentPassword')}
                    value={updateEmail.currentPassword || ''}
                    placeholder="********"
                    helperText="Please enter your account password to change your email address."
                    error={true}
                    fullWidth
                    margin="normal"
                    type="password"
                    variant="outlined"
                    inputProps={{
                      autoComplete: 'off',
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
              )}
            </Fragment>
          )}
          <div className={classes.inputContainer}>
            <TextField
              id="displayName"
              label="Display Name"
              className={classes.sideMargins}
              value={profile.displayName || ''}
              onChange={onProfileTextChange('displayName')}
              error={!!errors.displayName}
              helperText={
                errors.displayName ||
                'Your display name is used for leaving reviews.'
              }
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="phone"
              label="Phone Number"
              className={classes.sideMargins}
              value={profile.phone || ''}
              onChange={onProfileTextChange('phone')}
              placeholder="(999) 999-9999"
              error={!!errors.phone}
              helperText={errors.phone}
              margin="normal"
              fullWidth
              InputProps={{
                type: 'tel',
              }}
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="birthday"
              label="Birthday"
              className={classes.sideMargins}
              value={profile.birthday || ''}
              onChange={onProfileTextChange('birthday')}
              placeholder={'01-21-2001'}
              error={!!errors.birthday}
              helperText={errors.birthday}
              margin="normal"
              fullWidth
              InputProps={{
                type: 'tel',
              }}
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="zip"
              label="Zip Code"
              className={classes.sideMargins}
              value={profile.zip || ''}
              onChange={onProfileTextChange('zip')}
              error={!!errors.zip}
              helperText={errors.zip}
              margin="normal"
              fullWidth
            />
          </div>
          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={onProfileSubmit}
              disabled={Boolean(saving)}
            >
              Save
              {saving && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Paper>

    <Paper className={classes.paper}>
      <div className={classes.sideMargins}>
        <Typography variant="h6" gutterBottom>
          Update Password
        </Typography>
        <Divider className={classes.bottomMargin} light />
        <Typography variant="caption" gutterBottom>
          Updating your password is <b>optional</b>.
        </Typography>
      </div>
      <div className={classNames(classes.section, classes.lastSection)}>
        <div className={classes.sectionForm}>
          <div className={classes.inputContainer}>
            <TextField
              id="currentPassword"
              label="Current Password"
              className={classes.sideMargins}
              value={updatePassword.currentPassword}
              onChange={onPasswordTextChange('currentPassword')}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword}
              margin="normal"
              type="password"
              fullWidth
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="newPassword"
              label="New Password"
              className={classes.sideMargins}
              value={updatePassword.newPassword}
              onChange={onPasswordTextChange('newPassword')}
              error={!!errors.newPassword}
              helperText={errors.newPassword}
              margin="normal"
              type="password"
              fullWidth
            />
          </div>
          <div className={classes.inputContainer}>
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              className={classes.sideMargins}
              value={updatePassword.confirmPassword}
              onChange={onPasswordTextChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              type="password"
              fullWidth
            />
          </div>

          <div className={classes.actions}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={onPasswordSubmit}
              disabled={Boolean(saving)}
            >
              Save
              {saving && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Paper>
  </div>
)

ProfileForm.propTypes = {
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProfileForm)
