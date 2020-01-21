const styles = theme => {
  return {
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
        flexDirection: 'column',
        marginTop: 40,
        minHeight: 0,
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
        alignItems: 'flex-start',
      },
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    listingNameTitle: {
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
    reviewButton: {
      display: 'none',
      [theme.breakpoints.down('xs')]: {
        display: 'inherit',
        marginTop: theme.spacing.unit,
        marginBottom: 0,
        width: '100%',
      },
    },
    ratingContainer: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      [theme.breakpoints.down('sm')]: {
        marginBottom: '0.35em',
      },
    },
    ratingText: {
      marginTop: 2,
      marginLeft: theme.spacing.unit,
    },
    buttonActions: {
      textAlign: 'right',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    bottomClaimButton: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    popper: {
      marginLeft: theme.spacing.unit,
      zIndex: 10,
    },
    popperPaper: {
      padding: theme.spacing.unit,
    },
    listingTypeHeading: {
      display: 'flex',
      alignItems: 'center',
      borderLeft: '1px solid #cacaca',
      marginLeft: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2,
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    serviceIconSpan: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      [theme.breakpoints.down('xs')]: {
        marginLeft: 0,
        marginRight: theme.spacing.unit * 2,
      },
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
      },
    },
  }
}

export default styles
