const styles = theme => ({
  banner: {
    height: 420,
    width: '100%',
    position: 'relative',
    backgroundPosition: 'center center',
    [theme.breakpoints.down('lg')]: {
      height: 320,
    },
    [theme.breakpoints.down('md')]: {
      height: 280,
    },
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
    [theme.breakpoints.down('xs')]: {
      height: 140,
    },
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.5))',
  },
  avatar: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #d9d9d9',
    padding: 4,
    borderRadius: '50%',
    width: 200,
    height: 200,
    position: 'absolute',
    left: '10%',
    bottom: 'calc(0% - 100px)',
    zIndex: 3,
    [theme.breakpoints.down('md')]: {
      padding: 2,
      bottom: 'calc(0% - 100px)',
      height: 160,
      width: 160,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 2,
      left: 'calc(5% - 0px)',
      bottom: 'calc(0% - 40px)',
      height: 120,
      width: 120,
    },
    [theme.breakpoints.down('xs')]: {
      padding: 2,
      left: 'calc(50% - 50px)',
      bottom: 'calc(0% - 40px)',
      height: 100,
      width: 100,
    },
  },
})

export default styles
