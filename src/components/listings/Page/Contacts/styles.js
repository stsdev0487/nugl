const styles = theme => ({
  rightContent: {
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 2,
      height: '100%',
      width: '33%',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 2,
    },
  },
  tabContainer: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `solid 1px ${theme.palette.grey['200']}`,
    position: 'relative',
  },
  mapContainer: {
    width: '100%',
    height: 120,
    margin: 0,
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
  openIcon: {
    color: theme.palette.tertiary.main,
  },
  listIcon: {},
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  faIcon: {
    width: 24,
    textAlign: 'center',
  },
  socialShareContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  socialShare: {},
})

export default styles
