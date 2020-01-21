const styles = theme => ({
  tab: {
    // ok put icons back and make the padding top and bottom on the text below 2px instead of 6
    [theme.breakpoints.down('md')]: {
      minWidth: 100,
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 'inherit',
    },
  },
  tabReviewButton: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    top: 'calc(50% - 18px)',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  leftContent: {
    [theme.breakpoints.up('md')]: {
      height: '100%',
      flex: 1,
    },
  },
  tabContainer: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `solid 1px ${theme.palette.grey['200']}`,
    position: 'relative',
  },
  tabs: {
    width: '66%',
    [theme.breakpoints.down('xs')]: {
      width: 'inherit',
    },
  },
  list: {
    padding: 0,
  },
  listHeader: {
    backgroundColor: theme.palette.grey[50],
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0,0,0,0.13)',
    borderTop: '1px solid rgba(0,0,0,0.13)',
  },
  listItem: {
    color: theme.palette.common.white,
    borderLeft: 'solid 4px transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
  },
  emptyDetailsSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing.unit * 8,
  },
  emptyDetailsLine: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  noMenuContent: {
    textAlign: 'center',
    padding: theme.spacing.unit * 8,
  },
  noMenuTitle: {
    marginTop: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  noMenuLine: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
  },
})

export default styles
