const styles = theme => ({
  list: {
    padding: 0,
  },
  listHeader: {
    backgroundColor: theme.palette.grey[50],
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0,0,0,0.13)',
    borderTop: '1px solid rgba(0,0,0,0.13)',
  },
  listItem: {
    color: theme.palette.common.white,
    borderLeft: 'solid 4px transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      borderLeft: `solid 4px ${theme.palette.primary.main}`,
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  },
  logoPreviewCropped: {
    position: 'relative',
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
    width: 75,
    height: 75,
    minWidth: 75,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 75px',
  },
  logoEditButton: {
    border: '1px solid #d9d9d9',
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    right: -10,
    top: -6,
    width: 32,
    height: 32,
    padding: 0,
  },
  handle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing.unit,
  },
  bannerListItem: {
    padding: 0,
  },
  banner: {
    width: '100%',
    height: 'auto',
  },
  faIcon: {
    width: 24,
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    textAlign: 'center',
  },
  longSecondaryText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  deleteButton: {
    borderColor: theme.palette.statuses.declined,
    color: theme.palette.statuses.declined,
    '&:hover': {
      backgroundColor: 'rgba(246, 36, 0, 0.08)',
    },
  },
  brandAvatar: {
    height: 24,
    width: 24,
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
  },
})

export default styles
