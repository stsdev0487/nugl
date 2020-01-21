const styles = theme => ({
  banner: {
    height: 420,
    width: '100%',
    position: 'relative',
    backgroundSize: 'cover',
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
  topBannerText: {
    color: theme.palette.common.white,
    fontSize: '1.88rem',
  },
  topBannerSubText: {
    color: theme.palette.common.white,
    fontSize: '1.13rem',
    marginBottom: 20,
  },
  topBannerButton: {
    fontSize: '1.13rem',
    padding: '12px 30px',
    borderRadius: 50,
  },
  bannerText: {
    color: theme.palette.common.white,
  },
  gradient: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.5))',
    zIndex: 1,
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
  claimSection: {
    position: 'absolute',
    left: '50%',
    marginLeft: -200,
    width: 400,
    height: 200,
    top: '50%',
    marginTop: -100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  bottomClaimButton: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
})

export default styles
