import React, { Fragment, PureComponent } from 'react'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'

import Item from './Item'
import SearchParams from './SearchParams'
import styles from './styles'

class BusinessList extends PureComponent {
  state = {
    searchString: '',
  }

  onSearchChange = searchString => this.setState({ searchString })

  getServiceString = (business, services) =>
    business.type === 'Retail'
      ? 'Retail'
      : services.length
      ? services.join(', ')
      : ''

  renderItemsList = () => {
    const { businesses, onBusinessClick, classes } = this.props
    const { getServiceString } = this
    const filteredBusinesses = businesses.filter(
      item =>
        item.name &&
        item.name.toLowerCase().indexOf(this.state.searchString.toLowerCase()) >
          -1,
    )

    return (
      <List className={classes.list}>
        {filteredBusinesses.map(business => {
          const services =
            business && business.services ? business.services : []

          return (
            <Item
              key={business.id}
              business={business}
              onBusinessClick={onBusinessClick}
              servicesString={getServiceString(business, services)}
            />
          )
        })}
      </List>
    )
  }

  render() {
    const { renderItemsList, onSearchOrderChange, onSearchChange } = this

    return (
      <Fragment>
        <SearchParams
          onSearchOrderChange={onSearchOrderChange}
          onSearchChange={onSearchChange}
        />
        {renderItemsList()}
      </Fragment>
    )
  }
}

export default withStyles(styles)(BusinessList)
