const styles = theme => ({
  avatar: {
    border: '1px solid #d9d9d9',
    width: 75,
    height: 75,
    borderRadius: '51%',
  },
  listItem: {
    borderBottom: '1px solid #d9d9d9',
    display: 'flex',
  },
  businessName: {
    flexGrow: 1,
  },
  businessInfo: {
    flexGrow: 0,
    width: 120,
    minWidth: 120,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
})

export default styles
