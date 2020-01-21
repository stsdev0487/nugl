const styles = theme => ({
  avatar: {
    border: '1px solid #d9d9d9',
    width: 75,
    height: 75,
  },
  handle: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing.unit,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 2,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  tabs: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
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
  longSecondaryText: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  logoListItem: {
    textAlign: 'center',
  },
  bannerListItem: {
    padding: 0,
  },
  banner: {
    width: '100%',
    height: 'auto',
  },
  listAvatar: {
    padding: 2,
    width: 75,
    height: 75,
    border: 'solid 2px',
    borderRadius: '100%',
    borderColor: theme.palette.statuses.submitted,
  },
  actionButton: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
  },
  removeButton: {
    backgroundColor: theme.palette.statuses.declined,
    borderColor: theme.palette.statuses.declined,
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: '#E02100',
    },
  },
  deleteButton: {
    borderColor: theme.palette.statuses.declined,
    color: theme.palette.statuses.declined,
    '&:hover': {
      backgroundColor: 'rgba(246, 36, 0, 0.08)',
    },
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
  faIcon: {
    width: 24,
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    textAlign: 'center',
  },
})

export default styles
