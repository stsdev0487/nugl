import React, { Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Avatar from '../../../../common/Avatar'
import ListItemText from '../../../../common/ReversedListItemText'
import { ListItemSecondaryAction } from '@material-ui/core'
import BrandSearchBar from '../../../../common/BrandSearchBar'

const styles = theme => ({
  list: {
    padding: 0,
  },
  listHeader: {
    backgroundColor: theme.palette.grey[50],
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0,0,0,0.13)',
    borderTop: '1px solid rgba(0,0,0,0.13)',
  },
  listItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    fill: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.main,
      fill: theme.palette.primary.main,
      backgroundColor: 'rgba(255,255,255,0.3)',
    },
  },
  brandAvatar: {
    height: 24,
    width: 24,
    border: '1px solid #d9d9d9',
    borderRadius: '50%',
  },
})

const BusinessName = ({
  classes,
  business: { brands },
  brandSearchResults,
  searchBrands,
  clearBrands,
  handleBrandSelect,
  handleBrandDelete,
}) => {
  return (
    <Fragment>
      <DialogTitle id="responsive-dialog-title">Connected Brands</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Search for a brand to connect with your business.
        </DialogContentText>
        <BrandSearchBar
          brands={brandSearchResults}
          onFetch={searchBrands}
          onClear={clearBrands}
          onSelect={handleBrandSelect}
        />
        <List className={classes.list}>
          {brands && brands.length
            ? brands.sort().map(brand => (
                <ListItem key={brand.id} className={classes.listItem}>
                  <Avatar
                    className={classes.brandAvatar}
                    source={brand.logoUrl}
                  />
                  <ListItemText primary={brand.name} />
                  <ListItemSecondaryAction>
                    <IconButton>
                      <DeleteIcon onClick={handleBrandDelete(brand)} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            : null}
        </List>
      </DialogContent>
    </Fragment>
  )
}

export default withStyles(styles, { withTheme: true })(BusinessName)
