const styles = theme => ({
  main: {},
  banner: {
    height: 420,
    width: '100%',
    position: 'relative',
    backgroundPosition: 'center center',
    [theme.breakpoints.down('lg')]: {
      height: 320,
    },
    [theme.breakpoints.down('md')]: {
      height: 280,
    },
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
    [theme.breakpoints.down('xs')]: {
      height: 140,
    },
  },
  logo: {
    borderRadius: '50%',
    height: 200,
    width: 200,
    [theme.breakpoints.down('md')]: {
      height: 160,
      width: 160,
    },
    [theme.breakpoints.down('sm')]: {
      height: 120,
      width: 120,
    },
    [theme.breakpoints.down('xs')]: {
      height: 100,
      width: 100,
    },
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.5))',
  },
  avatar: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #d9d9d9',
    padding: 4,
    borderRadius: '50%',
    width: 200,
    height: 200,
    position: 'absolute',
    left: '10%',
    bottom: 'calc(0% - 100px)',
    zIndex: 3,
    [theme.breakpoints.down('md')]: {
      padding: 2,
      bottom: 'calc(0% - 100px)',
      height: 160,
      width: 160,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 2,
      left: 'calc(5% - 0px)',
      bottom: 'calc(0% - 40px)',
      height: 120,
      width: 120,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 2,
      left: 'calc(50% - 50px)',
      bottom: 'calc(0% - 40px)',
      height: 100,
      width: 100,
    },
  },
  title: {
    marginLeft: '10%',
    marginRight: '10%',
    paddingLeft: 200 + theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: 100,
    [theme.breakpoints.down('md')]: {
      paddingLeft: 160 + theme.spacing.unit * 2,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '5%',
      marginRight: '5%',
      paddingLeft: 0,
      marginTop: 40,
      minHeight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  sellButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      width: '100%',
    },
  },
  titleTypeContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit,
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing.unit,
      width: '100%',
      textAlign: 'center',
    },
  },
  titleLineTwo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      //flexDirection: "column",
      alignItems: 'flex-start',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  brandNameTitle: {
    fontSize: '1.7em',
    marginTop: '0.35em',
    marginBottom: '0.35em',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.3em',
    },
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ratingText: {
    marginTop: 2,
    marginLeft: theme.spacing.unit,
  },
  content: {
    margin: `${theme.spacing.unit * 2}px 10% ${theme.spacing.unit * 4}px`,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing.unit * 2}px 10%`,
    },
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 2}px 5%`,
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing.unit * 2}px 0px`,
    },
  },
  paper: {
    flex: 1,
  },
  tabContainer: {},
  tabs: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `solid 1px ${theme.palette.grey['200']}`,
  },
  mapContainer: {
    width: '100%',
    height: 120,
    margin: `0 0 ${theme.spacing.unit * 2}px 0`,
  },
  infoLine: {
    display: 'flex',
    margin: `${theme.spacing.unit}px 0`,
  },
  infoTitle: {
    flexBasis: '20%',
    flexShrink: 0,
    [theme.breakpoints.down('xs')]: {
      flexBasis: '25%',
    },
  },
  infoValue: {},
  infoField: {
    flexShrink: 0,
  },
  divider: {
    margin: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 2}px`,
  },
  bottomMargin: {
    marginBottom: theme.spacing.unit,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  buttonActions: {
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      minWidth: 140,
    },
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
  listIcon: {},
  faIcon: {
    width: 24,
    textAlign: 'center',
  },
  socialShareContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
})

export default styles
