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
})

export default styles
