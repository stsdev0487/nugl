const styles = theme => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    borderBottom: '1px solid #d9d9d9',
  },
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingRight: 25,
  },
  title: {
    height: 65,
    lineHeight: '65px',
    padding: '0 40px',
  },
  titleExtra: {
    color: '#0000008a',
  },
  headerUI: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  selectedMenu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  headerIcon: {
    cursor: 'pointer',
    marginLeft: 10,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
})

export default styles
