const styles = theme => ({
  menuButton: {
    marginLeft: 16,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  avatar: {
    border: '1px solid #d9d9d9',
    backgroundColor: theme.palette.common.white,
    width: 32,
    height: 32,
    borderRadius: '50%',
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
  photoButton: {
    padding: 0,
    marginLeft: theme.spacing.unit * 1,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  buttonIcon: {
    height: theme.spacing.unit * 2,
    width: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
  },
})

export default styles
