const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    top: theme.spacing.unit * 6,
    left: -89,
    zIndex: 999,
    maxHeight: 400,
    overflowY: 'auto',
    width: 444,
    [theme.breakpoints.down('sm')]: {
      top: 40,
      left: 4,
      width: 'calc(100% - 8px)',
    },
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 4,
    borderRadius: 30,
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 2,
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 8,
    },
  },
  textFieldRoot: {
    padding: 0,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 2,
      justifyContent: 'space-between',
    },
  },
  textFieldInput: {
    fontSize: 14,
    padding: '7px 0 6px !important',
    color: theme.palette.grey['900'],
    minWidth: 178,
    [theme.breakpoints.down('md')]: {
      minWidth: 140,
    },
  },
  searchIcon: {
    fill: theme.palette.grey[300],
  },
  locationIcon: {
    fill: theme.palette.primary.main,
    fontSize: '20px !important',
  },
  searchAdornment: {
    marginRight: 0,
    marginTop: 2,
  },
  searchButton: {
    padding: 6,
  },
})

export default styles
