const styles = theme => ({
  actions: {
    [theme.breakpoints.up('md')]: {
      width: 500,
      maxWidth: 500,
    },
  },
  stepper: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

export default styles
