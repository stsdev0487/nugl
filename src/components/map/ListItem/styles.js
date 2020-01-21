const styles = theme => ({
  card: {
    cursor: 'pointer',
    display: 'flex',
    borderBottom: '1px solid #d9d9d9',
    transition: theme.transitions.create([
      'margin',
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    '&:hover': {
      backgroundColor: '#fafafa',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  cardHovered: {
    cursor: 'pointer',
    display: 'flex',
    backgroundColor: '#fafafa',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'background',
    ]),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
  },
  featured: {
    backgroundColor: '#FFFCCF',
    borderBottom: '1px solid #d9d9d9',
    '&:hover': {
      backgroundColor: '#FFFCCF !important',
    },
    paddingTop: '0px !important',
  },
  sponsored: {
    backgroundColor: '#FFFCCF',
    paddingTop: 4,
    paddingBottom: 4,
  },
  details: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    position: 'relative',
    display: 'flex',
    width: 'calc(100% - 107px)',
    flexShrink: 0,
    flexDirection: 'column',
  },
  topContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  middleContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    display: 'flex',
    alignItems: 'center',
  },
  headingContainer: {},
  heading: {
    maxWidth: 'calc(100% - 64px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  services: {
    maxWidth: 'calc(100% - 64px)',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  cardButtons: {
    display: 'flex',
    flexDirection: 'row',
  },
  media: {
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
    height: 80,
    width: 80,
    marginRight: 15,
    marginLeft: 0,
    display: 'flex',
    flexShrink: 0,
  },
  featuredMedia: {
    height: 90,
    width: 90,
  },
  openGreen: {
    color: theme.palette.tertiary.dark,
  },
  closedRed: {
    color: theme.palette.secondary.dark,
  },
  noHours: {
    color: '#d0d0d0;',
  },
})

export default styles
