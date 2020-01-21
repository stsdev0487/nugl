const styles = theme => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing.unit * 4,
  },
  center: {
    textAlign: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing.unit * 2,
  },
  iconFamily: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
    maxWidth: '150px',
    minWidth: '40px',
  },
})

export default styles
