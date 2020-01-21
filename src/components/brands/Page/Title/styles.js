const styles = theme => ({
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
})

export default styles
