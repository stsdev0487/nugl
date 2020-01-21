const styles = theme => ({
  list: {
    padding: 0,
  },
  listItem: {
    color: theme.palette.common.white,
    borderLeft: 'solid 4px transparent',
    backgroundColor: 'rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      borderLeft: `solid 4px ${theme.palette.primary.main}`,
      backgroundColor: 'rgba(255,255,255,0.2)',
    },
  },
  listHeader: {
    backgroundColor: theme.palette.grey[50],
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0,0,0,0.13)',
    borderTop: '1px solid rgba(0,0,0,0.13)',
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    wordBreak: 'break-word',
    whiteSpace: 'normal',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  faIcon: {
    width: 24,
    textAlign: 'center',
  },
})

export default styles
