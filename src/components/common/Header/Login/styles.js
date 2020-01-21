const styles = theme => ({
  menuButton: {
    marginLeft: 16,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  side: {
    flexBasis: '25%',
    [theme.breakpoints.down('sm')]: {
      order: 0,
      paddingLeft: theme.spacing.unit,
      flexBasis: 'calc(50% - 8px)',
    },
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  signInButton: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  signUpButton: {
    color: theme.palette.common.white,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
})

export default styles
