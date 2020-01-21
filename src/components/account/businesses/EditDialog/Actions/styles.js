const styles = theme => ({
  actions: {
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
    display: 'flex',
    justifyContent: 'space-around',
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
