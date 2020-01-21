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
  logoPreviewCropped: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px 0`,
    width: 150,
    height: 150,
    borderRadius: '51%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 150px',
    border: '1px solid #d9d9d9',
  },
  error: {
    color: 'red',
  },
})

const BusinessLogo = ({
  classes,
  business,
  logoImage,
  errors,
  onError,
  onUpload,
}) => (
  <Fragment>
    <DialogTitle id="responsive-dialog-title">Company Logo</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Upload your company logo. <strong>It may take a few minutes.</strong>
      </DialogContentText>
      <div className={classes.uploadContainer}>
        {logoImage ? (
          <div
            className={classes.logoPreviewCropped}
            style={{
              backgroundImage: `url(${logoImage.dataUrl})`,
            }}
          />
        ) : (
          <img
            src={require('../../../../../static/images/logo-helper.png')}
            className={classes.preview}
            alt="preview"
          />
        )}
        <Typography variant="caption" gutterBottom align="center">
          Recommended size for your logo: 600 x 600px
          <br />
          Allowed image file types: .jpg, .jpeg, .png, .gif
        </Typography>
        {errors.logoImage && (
          <Typography
            className={classes.error}
            variant="caption"
            gutterBottom
            align="center"
          >
            {errors.logoImage}
          </Typography>
        )}
        <Upload
          name="logoImage"
          fileName="logo"
          onFileLoad={onUpload('logoImage')}
          onError={onError('logoImage')}
          fileTypes={['.jpg', 'jpeg', '.gif', '.png']}
        />
      </div>
    </DialogContent>
  </Fragment>
)

BusinessLogo.propTypes = {
  classes: shape({
    stepContent: string,
    uploadContainer: string,
    logoPreviewCropped: string,
    preview: string,
    error: string,
  }).isRequired,
  logoImage: shape({
    dataUrl: string,
  }),
  errors: shape({
    logoImage: string,
  }).isRequired,
  onUpload: func.isRequired,
  onError: func.isRequired,
}

export default withStyles(styles, { withTheme: true })(BusinessLogo)
