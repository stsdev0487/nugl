const styles = theme => ({
  main: {
    margin: `${theme.spacing.unit * 4}px 15%`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
  },
  paper: {
    padding: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  },
  photoSection: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 4,
  },
  accountTypeAvatar: {
    backgroundColor: theme.palette.common.white,
  },
  avatar: {
    border: '1px solid rgba(0,0,0,0.23)',
    marginBottom: theme.spacing.unit * 2,
    width: 125,
    height: 125,
    borderRadius: '51%',
  },
  personIcon: {
    width: 100,
    height: 100,
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit * 2,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionForm: {
    flexGrow: 2,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  marginNormal: {
    marginTop: 16,
    marginBottom: 8,
  },
  sideMargins: {
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end ',
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  upgradeButton: {
    marginBottom: '0.35em',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: theme.spacing.unit * 3,
      border: 'solid 1px rgba(0, 0, 0, 0.08)',
    },
  },
  list: {
    borderTop: 'solid 1px rgba(0,0,0,0.23)',
    borderBottom: 'solid 1px rgba(0,0,0,0.23)',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  uploadButtonText: {
    textTransform: 'none',
  },
})

export default styles
