const styles = theme => ({
  main: {
    margin: `${theme.spacing.unit * 4}px 15%`,
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
    },
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  addButton: {
    position: 'absolute',
    left: -28,
    top: 36,
  },
  tabsNav: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  itemsTabs: {
    height: 65,
  },
})

export default styles
