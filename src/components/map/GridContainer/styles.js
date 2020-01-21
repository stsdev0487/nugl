const styles = theme => ({
  main: {
    position: 'absolute',
    height: 'calc(100% - 48px)',
    bottom: 0,
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 88px)',
    },
  },
  insetShadow: {
    position: 'absolute',
    height: 5,
    width: 'calc(100% - 0px)',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)',
    opacity: 0.3,
    zIndex: 1,
  },
  grid: {
    flex: '1 1 auto',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  left: {
    overflowY: 'scroll',
    width: '500px',
    height: '100%',
    flexShrink: 0,
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 2,
      height: 'calc(100% - 300px)',
      width: '100%',
      flexShrink: 1,
      overflowY: 'auto',
    },
    [theme.breakpoints.down('xs')]: {
      height: 'calc(100% - 200px)',
    },
  },
  right: {
    position: 'relative',
    flex: '1 1 auto',
    order: 1,
    [theme.breakpoints.down('sm')]: {
      order: 1,
      height: '200px',
    },
  },
  listSubheader: {
    backgroundColor: theme.palette.common.white,
    borderBottom: '1px solid #d9d9d9',
    display: 'flex',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  pagingContainer: {
    width: 'calc(100% - 8px)',
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageButton: {},
  list: {
    padding: 0,
    backgroundColor: theme.palette.common.white,
  },
  mapAd: {
    position: 'absolute',
    height: 125,
    width: 150,
    bottom: 30,
    left: 10,
    zIndex: 1,
  },
  closeBlockButton: {
    position: 'absolute',
    right: -19,
    top: 0,
    backgroundColor: 'transparent !important',
  },
  leaderboardAdSubheader: {
    padding: 0,
    margin: 0,
    borderBottom: 'solid 1px #d9d9d9',
  },
  leaderboardAd: {
    display: 'flex',
    alignItems: 'center',
  },
  leaderboardAdLink: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  leaderboardAdImage: { width: '100%' },
  filterButton: {
    boxShadow: 'none',
  },
})

export default styles
