export const dateRange = theme => ({
  dateRange: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 2,
    },
  },
  dayLabel: {
    width: 100,
    [theme.breakpoints.down('xs')]: {
      order: 0,
      marginBottom: 0,
      flexBasis: '50%',
    },
  },
  dateRangeAdornment: {
    marginRight: theme.spacing.unit * 2,
  },
  dateInput: {
    width: 140,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 16px)',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      order: 2,
    },
  },
  dateRangeLabel: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  daySwitch: {
    [theme.breakpoints.down('xs')]: {
      order: 1,
    },
  },
  switchPlaceholder: {
    minWidth: 62,
  },
})
