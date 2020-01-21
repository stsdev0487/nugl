const styles = theme => ({
  avatar: {
    border: '1px solid #d9d9d9',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    top: 80,
    left: 8,
    zIndex: 999,
    maxHeight: 400,
    overflowY: 'auto',
    width: 444,
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
    margin: 4,
    borderRadius: 0,
    backgroundColor: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      flexGrow: 2,
    },
  },
  textField: {
    borderRadius: 20,
    width: 'calc(100% - 14px) !important',
  },
  textFieldLabel: {
    color: theme.palette.common.white,
    '&$textFieldFocused': {
      color: theme.palette.secondary.main,
    },
  },
  textFieldFocused: {},
  textFieldShrink: {},
  textFieldOutlinedInput: {
    borderRadius: 20,
    color: theme.palette.common.white,
    '&$textFieldFocused $textFieldNotchedOutline': {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
  },
  textFieldNotchedOutline: {
    borderColor: 'rgba(255,255,255,0.0) !important',
    borderRadius: 20,
    //borderColor: `${theme.palette.secondary.dark} !important`
  },
  menuItem: {
    height: 42,
  },
  listItemText: {
    whitSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

export default styles
