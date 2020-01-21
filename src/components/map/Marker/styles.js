const styles = theme => ({
  marker: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
  },
  markerSelected: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
    zIndex: 998,
  },
  selectedIcon: {
    fill: theme.palette.secondary.main,
  },
})

export default styles
