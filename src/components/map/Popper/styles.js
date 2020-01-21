const styles = theme => ({
  root: {
    position: 'absolute',
    padding: theme.spacing.unit,
    display: 'flex',
    alignItems: 'center',
    minWidth: 240,
  },
  logo: {
    width: 52,
    height: 52,
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
    marginRight: theme.spacing.unit,
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit,
    width: 240,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  name: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  bottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openGreen: {
    color: theme.palette.tertiary.dark,
  },
  closedRed: {},
})

export default styles
