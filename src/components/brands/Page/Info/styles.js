const styles = theme => ({
  content: {
    margin: `${theme.spacing.unit * 2}px 10% ${theme.spacing.unit * 4}px`,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing.unit * 2}px 10%`,
    },
    [theme.breakpoints.down('sm')]: {
      margin: `${theme.spacing.unit * 2}px 5%`,
      flexDirection: 'column',
    },
    [theme.breakpoints.down('xs')]: {
      margin: `${theme.spacing.unit * 2}px 0px`,
    },
  },
  paper: {
    flex: 1,
  },
  tabs: {
    borderBottom: '1px solid #d9d9d9',
  },
})

export default styles
