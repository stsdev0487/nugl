const styles = theme => ({
  content: {
    maxWidth: 500,
    [theme.breakpoints.up('sm')]: {
      width: 500,
    },
  },
  formControl: {
    width: '100%',
  },
  categoryIcon: {
    height: 32,
    width: 32,
  },
  inputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  categoryToggles: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
  },
  categoryToggle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 72,
    borderRadius: '10px !important',
    '&$selected': {
      boxShadow: 'none',
    },
  },
  categoryToggleSelected: {
    backgroundColor: '#D6E8F7 !important',
  },
  categoryToggleLabelWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  categoryToggleLabel: {
    textAlign: 'center',
    marginTop: theme.spacing.unit,
    textTransform: 'none',
  },
  actions: {
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px',
  },
})

export default styles
