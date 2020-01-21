const styles = theme => ({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: 0,
    width: 'calc(100% - 48px)',
  },
  caption: {
    fontSize: '0.9em',
  },
  headerImage: {
    width: '100%',
  },
  actions: {
    marginTop: theme.spacing.unit * 2,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
})

export default styles
