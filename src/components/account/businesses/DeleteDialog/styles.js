const styles = theme => ({
  content: {
    maxWidth: 500,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
  },
  divider: {
    width: 'calc(100% - 32px)',
    marginLeft: '16px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
  topMargin: {
    marginTop: theme.spacing.unit,
  },
  group: {
    margin: `${theme.spacing.unit}px 0 0 0`,
  },
  formControl: {
    marginLeft: theme.spacing.unit * 3,
  },
})

export default styles
