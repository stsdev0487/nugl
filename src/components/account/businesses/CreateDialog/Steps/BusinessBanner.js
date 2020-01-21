import React, { Fragment } from 'react'
import { shape, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import Upload from '../../../../common/Upload'

const styles = theme => ({
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preview: {
    width: 460,
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px 0`,
    borderRadius: 0,
    borderColor: '#80bdff',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  bannerPreviewCropped: {
    width: '100%',
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px 0`,
    height: 150,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 150px',
    borderColor: '#80bdff',
  },
  stepContent: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4,
  },
  error: {
    color: 'red',
  },
})

const BusinessBanner = ({
  classes,
  bannerImage,
  errors,
  onError,
  onUpload,
}) => {
  return (
    <Fragment>
      <DialogTitle id="responsive-dialog-title">Cover Photo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload your cover photo. <strong>It may take a few minutes.</strong>
        </DialogContentText>

        <div className={classes.uploadContainer}>
          {bannerImage ? (
            <div
              className={classes.bannerPreviewCropped}
              style={{
                backgroundImage: `url(${bannerImage.dataUrl})`,
              }}
            />
          ) : (
            <img
              src={require('../../../../../static/images/banner-helper.png')}
              className={classes.preview}
              alt="preview"
            />
          )}
          <Typography variant="caption" gutterBottom align="center">
            Recommended size for your banner: 1500 x 500px
          </Typography>
          {errors.bannerImage && (
            <Typography
              className={classes.error}
              variant="caption"
              gutterBottom
              align="center"
            >
              {errors.bannerImage}
            </Typography>
          )}
          <Upload
            name="bannerImage"
            fileName="banner"
            onFileLoad={onUpload('bannerImage')}
            onError={onError('bannerImage')}
            fileTypes={['.jpg', 'jpeg', '.gif', '.png']}
          />
        </div>
      </DialogContent>
    </Fragment>
  )
}

BusinessBanner.propTypes = {
  classes: shape({
    stepContent: string,
    uploadContainer: string,
    bannerPreviewCropped: string,
    preview: string,
    error: string,
  }).isRequired,
  bannerImage: shape({
    dataUrl: string,
  }),
  errors: shape({
    bannerImage: string,
  }).isRequired,
  onUpload: func.isRequired,
  onError: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessBanner)
