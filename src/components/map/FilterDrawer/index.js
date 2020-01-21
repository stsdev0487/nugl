import React, { PureComponent } from 'react'
import {
  Checkbox,
  MenuItem,
  List,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Button,
  IconButton,
  Drawer,
  Typography,
  Collapse,
  withStyles,
} from '@material-ui/core'

import { Remove, ExpandMore, ExpandLess, Close } from '@material-ui/icons'

import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

import Avatar from '../../common/Avatar'
import AlgoliaApi from '../../../api/AlgoliaApi'
import Categories, { Subtypes } from '../../../const/BusinessTypes'
import BrandIcon from '../../../static/images/categories/brand.svg'
import RetailIcon from '../../../static/images/categories/storefront.svg'
import ServiceIcon from '../../../static/images/categories/service.svg'
import InfluencerIcon from '../../../static/images/categories/influencer.svg'

import Search from './Search'

import styles from './styles'

const FILTERS = {
  BRANDS: 'brands',
  PRODUCTS: Categories.BRAND,
  SERVICES: Categories.SERVICE,
  CHANNELS: 'channels',
  AMENITIES: 'amenities',
}

const HEADERS = {
  [FILTERS.BRANDS]: 'Filter by Brand',
  [FILTERS.PRODUCTS]: 'Product Type',
  [FILTERS.SERVICES]: 'Business Type',
  [FILTERS.CHANNELS]: 'Buying Options',
  [FILTERS.AMENITIES]: 'Amenities',
}

class NuglDrawer extends PureComponent {
  state = {
    brands: {},
    brandSearchResults: [],
    toggleCategories: [],
    toggleMenuItems: {
      [FILTERS.BRANDS]: true,
      [FILTERS.PRODUCTS]: true,
      [FILTERS.SERVICES]: true,
      [FILTERS.CHANNELS]: true,
      [FILTERS.AMENITIES]: true,
    },
    filters: {
      [FILTERS.BRANDS]: [],
      [FILTERS.PRODUCTS]: [],
      [FILTERS.SERVICES]: [],
      [FILTERS.CHANNELS]: [],
      [FILTERS.AMENITIES]: [],
    },
  }

  containsCategories = categories =>
    this.state.toggleCategories &&
    (Array.isArray(categories) ? categories : [categories]).reduce(
      (hasMatch, category) =>
        hasMatch || this.state.toggleCategories.indexOf(category) > -1,
      false,
    )

  searchBrands = query => {
    AlgoliaApi.searchBrands(query).then(brandSearchResults => {
      this.setState({ brandSearchResults })
    })
  }

  clearBrands = () => {
    this.setState({ brandSearchResults: [] })
  }

  updateFilters = (toggleCategories, filters) => {
    const algoliaFilters = {
      brands: filters[FILTERS.BRANDS],
      brandCategories: filters[FILTERS.PRODUCTS],
      services: filters[FILTERS.SERVICES],
      channels: filters[FILTERS.CHANNELS],
      amenities: filters[FILTERS.AMENITIES],
      type:
        toggleCategories.length === 1 &&
        toggleCategories.indexOf(Categories.BRAND) > -1
          ? [Categories.RETAIL, Categories.SERVICE, Categories.INFLUENCER]
          : toggleCategories,
    }
    this.props.updateFilter(algoliaFilters)
  }

  handleBrandSelect = brand => {
    const { brands, filters, toggleCategories } = this.state
    if (brands[brand.id]) {
      return
    }
    const newFilters = { ...filters, brands: [...filters.brands, brand.id] }
    this.setState({
      brands: { ...brands, [brand.id]: brand },
      filters: newFilters,
    })
    this.updateFilters(toggleCategories, newFilters)
  }

  handleRemoveBrand = brandId => () => {
    const { filters, toggleCategories } = this.state
    const brands = { ...this.state.brands }
    delete brands[brandId]
    const newFilters = {
      ...filters,
      brands: [...filters.brands.filter(e => e !== brandId)],
    }
    this.setState({ brands, filters: newFilters })
    this.updateFilters(toggleCategories, newFilters)
  }

  handleToggleCategory = (event, toggleCategories) => {
    const { filters } = this.state
    this.setState({ toggleCategories: toggleCategories || [] })
    this.updateFilters(toggleCategories || [], filters)
  }

  handleCollapseClick = name => () => {
    const { toggleMenuItems } = this.state
    const toggles = { ...toggleMenuItems }
    toggles[name] = !toggles[name]
    this.setState({ toggleMenuItems: toggles })
  }

  handleFilterCheckChange = filter => (event, checked) => {
    const { filters, toggleCategories } = this.state
    const subset = checked
      ? [...filters[filter], event.target.value]
      : [...filters[filter].filter(e => e !== event.target.value)]
    const newFilters = { ...filters, [filter]: subset }
    this.setState({ filters: newFilters })
    this.updateFilters(toggleCategories, newFilters)
  }

  handleShowAllCheckChange = filter => event => {
    const { filters, toggleCategories } = this.state
    const checked = event.target.checked
    if (!checked) {
      return
    }
    const newFilters = { ...filters, [filter]: [] }
    this.setState({ filters: newFilters })
    this.updateFilters(toggleCategories, newFilters)
  }

  filterMenuItemSubheader = (filter, disableCollapse) => (
    <ListSubheader
      onClick={disableCollapse ? null : this.handleCollapseClick(filter)}
      className={this.props.classes.subheader}
      button="true"
      disableSticky
    >
      {HEADERS[filter]}
      {!disableCollapse && (
        <IconButton
          onClick={this.handleCollapseClick(filter)}
          className={this.props.classes.listItemIconButton}
        >
          {this.state.toggleMenuItems[filter] ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      )}
    </ListSubheader>
  )

  filterMenuItem = (filter, value, index) => {
    const { filters } = this.state
    const { classes } = this.props
    return (
      <MenuItem key={`${value}-${index}`} className={classes.menuItem}>
        <Checkbox
          value={value}
          onChange={this.handleFilterCheckChange(filter)}
          checked={filters[filter].indexOf(value) > -1}
          classes={{
            root: classes.checkbox,
          }}
        />
        <ListItemText
          className={classes.listItemText}
          primary={value}
          disableTypography
        />
      </MenuItem>
    )
  }

  showingAllMenuItem = filter => {
    const { filters } = this.state
    const { classes } = this.props
    return (
      <MenuItem key={`all-${filter}`} className={classes.menuItem}>
        <Checkbox
          onClick={this.handleShowAllCheckChange(filter)}
          checked={filters[filter].length === 0}
          classes={{
            root: classes.checkbox,
          }}
        />
        <ListItemText
          className={classes.listItemText}
          primary="All Results"
          disableTypography
        />
      </MenuItem>
    )
  }

  renderFilterMenuItems = (filter, categories) => {
    const { toggleCategories } = this.state
    const categoriesArray = Array.isArray(categories)
      ? categories
      : [categories]
    const reducedSubtypes = Subtypes.filter(
      e =>
        categoriesArray
          .filter(a => toggleCategories.indexOf(a) > -1)
          .indexOf(e.type) > -1,
    )
      .reduce(
        (menuItems, currentCategory) => [
          ...menuItems,
          ...currentCategory.subtypes,
        ],
        [],
      )
      .sort((a, b) => {
        if (a.indexOf('Other') > -1) {
          return 1
        }
        if (b.indexOf('Other') > -1) {
          return -1
        }
        if (a === b) {
          return 0
        }
        return a > b ? 1 : -1
      })
      .map((subtype, index) => this.filterMenuItem(filter, subtype, index))
    return reducedSubtypes
  }

  renderReducedMenuItems = list => {
    const { toggleCategories } = this.state
    return Subtypes.filter(
      subtype => toggleCategories.indexOf(subtype.type) > -1,
    )
      .reduce(
        (channels, currentSubtype) =>
          channels.concat(
            currentSubtype[list].filter(e => channels.indexOf(e) < 0),
          ),
        [],
      )
      .map((category, index) => this.filterMenuItem(list, category, index))
  }

  renderBrands = () => {
    const { handleRemoveBrand } = this
    const { classes } = this.props
    const { brands } = this.state
    return Object.keys(brands).map(brandId => {
      const brand = brands[brandId]
      return (
        <MenuItem
          key={`filtered-brand-${brand.id}`}
          className={classes.menuItem}
          dense={false}
        >
          <Avatar className={classes.avatar} source={brand.logoUrl} />
          <ListItemText
            className={classes.brandListItemText}
            primary={brand.name}
            disableTypography
          />
          <ListItemSecondaryAction>
            <IconButton
              className={classes.listItemIconButton}
              onClick={handleRemoveBrand(brandId)}
              size="small"
            >
              <Remove />
            </IconButton>
          </ListItemSecondaryAction>
        </MenuItem>
      )
    })
  }

  render() {
    const {
      searchBrands,
      clearBrands,
      handleBrandSelect,
      containsCategories,
      showingAllMenuItem,
      handleToggleCategory,
      filterMenuItemSubheader,
      renderFilterMenuItems,
      renderReducedMenuItems,
      renderBrands,
    } = this
    const {
      brands,
      brandSearchResults,
      toggleCategories,
      toggleMenuItems,
    } = this.state
    const { open, onToggleDrawer, classes } = this.props
    const toggleCategoriesAreNotEmpty = toggleCategories.length > 0
    return (
      <Drawer
        open={open}
        onClose={onToggleDrawer(false)}
        anchor="right"
        classes={{
          paper: classes.main,
        }}
      >
        <div tabIndex={0} role="button" className={classes.listContainer}>
          <List className={classes.list}>
            <ListSubheader className={classes.closeHeader} disableSticky>
              <Typography className={classes.closeTitle} variant="h6">
                Show results for
              </Typography>
              <IconButton onClick={onToggleDrawer(false)}>
                <Close className={classes.closeIcon} />
              </IconButton>
            </ListSubheader>
            <ListSubheader className={classes.subheader} disableSticky>
              Category
            </ListSubheader>
            <div>
              <ToggleButtonGroup
                value={toggleCategories}
                onChange={handleToggleCategory}
                className={classes.categoryToggles}
              >
                <ToggleButton
                  value={Categories.BRAND}
                  className={classes.categoryToggle}
                  classes={{
                    label: classes.categoryToggleLabelWrapper,
                    selected: classes.categoryToggleSelected,
                  }}
                >
                  <img
                    className={classes.categoryIcon}
                    src={BrandIcon}
                    alt={Categories.BRAND}
                  />
                  <Typography
                    className={classes.categoryToggleLabel}
                    variant="caption"
                    gutterBottom
                  >
                    {Categories.BRAND}
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value={Categories.RETAIL}
                  className={classes.categoryToggle}
                  classes={{
                    label: classes.categoryToggleLabelWrapper,
                    selected: classes.categoryToggleSelected,
                  }}
                >
                  <img
                    className={classes.categoryIcon}
                    src={RetailIcon}
                    alt={Categories.RETAIL}
                  />
                  <Typography
                    className={classes.categoryToggleLabel}
                    variant="caption"
                    gutterBottom
                  >
                    {Categories.RETAIL}
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value={Categories.SERVICE}
                  className={classes.categoryToggle}
                  classes={{
                    label: classes.categoryToggleLabelWrapper,
                    selected: classes.categoryToggleSelected,
                  }}
                >
                  <img
                    className={classes.categoryIcon}
                    src={ServiceIcon}
                    alt={Categories.SERVICE}
                  />
                  <Typography
                    className={classes.categoryToggleLabel}
                    variant="caption"
                    gutterBottom
                  >
                    {Categories.SERVICE}
                  </Typography>
                </ToggleButton>
                <ToggleButton
                  value={Categories.INFLUENCER}
                  className={classes.categoryToggle}
                  classes={{
                    label: classes.categoryToggleLabelWrapper,
                    selected: classes.categoryToggleSelected,
                  }}
                >
                  <img
                    className={classes.categoryIcon}
                    src={InfluencerIcon}
                    alt={Categories.INFLUENCER}
                  />
                  <Typography
                    className={classes.categoryToggleLabel}
                    variant="caption"
                    gutterBottom
                  >
                    {Categories.INFLUENCER}
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </div>

            <Collapse in={containsCategories(Categories.BRAND)}>
              {filterMenuItemSubheader(FILTERS.BRANDS, true)}
              <Collapse in={toggleMenuItems[FILTERS.BRANDS]}>
                <div className={classes.searchContainer}>
                  <Search
                    brands={brandSearchResults}
                    onFetch={searchBrands}
                    onClear={clearBrands}
                    onSelect={handleBrandSelect}
                  />
                </div>
                {renderBrands(brands)}
              </Collapse>
            </Collapse>

            <Collapse in={containsCategories(Categories.BRAND)}>
              {filterMenuItemSubheader(FILTERS.PRODUCTS)}
              <Collapse in={toggleMenuItems[FILTERS.PRODUCTS]}>
                {showingAllMenuItem(FILTERS.PRODUCTS)}
                {renderFilterMenuItems(FILTERS.PRODUCTS, Categories.BRAND)}
              </Collapse>
            </Collapse>

            <Collapse
              in={containsCategories([
                Categories.RETAIL,
                Categories.SERVICE,
                Categories.INFLUENCER,
              ])}
            >
              {filterMenuItemSubheader(FILTERS.SERVICES)}
              <Collapse in={toggleMenuItems[FILTERS.SERVICES]}>
                {showingAllMenuItem(FILTERS.SERVICES)}
                {renderFilterMenuItems(FILTERS.SERVICES, [
                  Categories.RETAIL,
                  Categories.SERVICE,
                  Categories.INFLUENCER,
                ])}
              </Collapse>
            </Collapse>

            <Collapse in={toggleCategoriesAreNotEmpty}>
              {filterMenuItemSubheader(FILTERS.CHANNELS)}
              <Collapse in={toggleMenuItems[FILTERS.CHANNELS]}>
                {showingAllMenuItem(FILTERS.CHANNELS)}
                {renderReducedMenuItems(FILTERS.CHANNELS)}
              </Collapse>
            </Collapse>

            <Collapse in={toggleCategoriesAreNotEmpty}>
              {filterMenuItemSubheader(FILTERS.AMENITIES)}
              <Collapse in={toggleMenuItems[FILTERS.AMENITIES]}>
                {showingAllMenuItem(FILTERS.AMENITIES)}
                {renderReducedMenuItems(FILTERS.AMENITIES)}
              </Collapse>
            </Collapse>
          </List>
        </div>
        <div className={classes.applyContainer}>
          <Button
            onClick={onToggleDrawer(false)}
            variant="contained"
            fullWidth
            color="secondary"
          >
            Apply Filters
          </Button>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(NuglDrawer)
