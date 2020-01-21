const styles = theme => ({
  appBar: {},
  side: {
    flexBasis: '25%',
    [theme.breakpoints.down('sm')]: {
      order: 0,
      paddingLeft: theme.spacing.unit,
      flexBasis: 'calc(50% - 8px)',
    },
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toolBar: {
    minHeight: '46px !important',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 0,
    },
  },
  searchArea: {
    display: 'flex',
    flex: 2,
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      order: 1,
    },
  },
  searchBox: {
    display: 'flex',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexGrow: 2,
    },
  },
})

export default styles
