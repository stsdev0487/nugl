const styles = theme => ({
  main: {
    backgroundColor: '#111111',
  },
  list: {
    width: 300,
    color: theme.palette.common.white,
    paddingTop: 0,
  },
  listContainer: { paddingBottom: 0 },
  subheader: {
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 4,
    color: '#959595',
    fill: '#959595',
    fontWeight: 300,
    fontSize: '0.8em',
    textTransform: 'uppercase',
  },
  listItemIconButton: {
    color: 'inherit',
    fill: 'inherit',
  },
  closeHeader: {
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeTitle: {
    color: 'white',
    fontWeight: 300,
  },
  closeIcon: {
    fill: theme.palette.common.white,
  },
  avatar: {
    height: 24,
    width: 24,
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
    marginLeft: 11,
  },
  menuItem: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    color: theme.palette.common.white,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
    fontWeight: 300,
    fontSize: '0.8em',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
  },
  listItemText: {
    paddingLeft: 0,
    color: 'inherit',
  },
  brandListItemText: {
    color: theme.palette.common.white,
  },
  topBorder: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  checkbox: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },
  categoryIcon: {
    height: 32,
    width: 32,
  },
  categoryToggles: {
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  categoryToggle: {
    fontWeight: 200,
    minWidth: 75,
    width: 75,
    height: 64,
    '&$selected': {
      color: 'white',
    },
  },
  categoryToggleSelected: {
    borderBottom: 'solid 2px',
    borderBottomColor: theme.palette.secondary.main,
  },
  categoryToggleLabelWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  categoryToggleLabel: {
    color: '#959595',
    marginTop: theme.spacing.unit,
    fontSize: '.70em',
    textTransform: 'none',
  },
  searchContainer: {
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  applyContainer: {
    backgroundColor: '#111111',
    bottom: 0,
    left: 0,
    padding: theme.spacing.unit,
    position: 'sticky',
    width: 'calc(100% - 16px)',
  },
})

export default styles
