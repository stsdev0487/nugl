import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { BusinessTypeConsumer } from '../BusinessContext'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import { success, error } from '../../../../store/actions/messageActions'
import BusinessPanel from './Panel'
import BusinessList from './List'
import Header from './Header'
import DeleteDialog from '../DeleteDialog'
import NoResults from './NoResults'

import styles from './styles'

class Businesses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 0,
      editingItem: null,
      deleteDialogOpen: false,
    }
  }

  handleBackClick = () => {
    this.setState({ tab: 0 })
    this.props.onBackClick()
  }

  handleChangeTab = (e, value) => this.setState({ tab: value })

  handleCloseDeleteDialog = () => this.setState({ deleteDialogOpen: false })

  handleDeleteBusinessSubmit = ({ type, reason, description }) => {
    const {
      onSubmitRemoval,
      selectedBusiness: { id, userId, name },
    } = this.props

    const data = {
      type,
      reason,
      description,
      userId,
      businessId: id,
      businessName: name,
      status: 'SUBMITTED',
    }

    onSubmitRemoval(data)
  }

  render() {
    const {
      handleChangeTab,
      handleCloseDeleteDialog,
      handleDeleteBusinessSubmit,
      handleBackClick,
    } = this

    const {
      selectedBusiness,
      businesses,
      onAddBusinessDialogOpen,
      onPublishToggle,
      onFeatureToggle,
      onSubmit,
      onSubmitRemoval,
      onBusinessClick,
      goto,
      classes,
      user: { uid: userId },
      updateSelectedBusiness,
      onContextSwitch,
      connectBusinessToBrand,
      removeBusinessToBrandConnection,
    } = this.props

    const {
      tab,
      addDialogOpen,
      editingItem,
      deleteDialogOpen,
      isEditing,
    } = this.state

    return (
      <BusinessTypeConsumer>
        {contextProps => {
          return (
            <div className={classes.main}>
              {selectedBusiness && (
                <div className={classes.tabsNav}>
                  <Button onClick={handleBackClick}>
                    <NavigateBeforeIcon />
                    <Typography variant="subtitle1">Back</Typography>
                  </Button>
                  <Tabs
                    value={tab}
                    className={classes.tabs}
                    onChange={handleChangeTab}
                    centered
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Details" />
                  </Tabs>
                </div>
              )}
              <Paper>
                <Header
                  title={contextProps.title}
                  selectedBusiness={selectedBusiness}
                  onContextSwitch={onContextSwitch}
                >
                  <Tooltip title={'Add a Profile'} placement="right">
                    <Button
                      className={classes.addButton}
                      variant="fab"
                      color="primary"
                      onClick={onAddBusinessDialogOpen}
                    >
                      <AddIcon />
                    </Button>
                  </Tooltip>
                </Header>

                <DeleteDialog
                  type={contextProps.singular}
                  open={deleteDialogOpen}
                  onClose={handleCloseDeleteDialog}
                  onSubmitRemoval={handleDeleteBusinessSubmit}
                />

                {selectedBusiness ? (
                  <BusinessPanel
                    tab={tab}
                    editingItem={editingItem}
                    isEditing={isEditing}
                    addDialogOpen={addDialogOpen}
                    key={selectedBusiness.id}
                    business={selectedBusiness}
                    businsses={businesses}
                    updateSelectedBusiness={updateSelectedBusiness}
                    onPublishToggle={onPublishToggle}
                    onFeatureToggle={onFeatureToggle}
                    onSubmit={onSubmit}
                    onSubmitRemoval={onSubmitRemoval}
                    goto={goto}
                    onBackClick={handleBackClick}
                    userId={userId}
                    connectBusinessToBrand={connectBusinessToBrand}
                    removeBusinessToBrandConnection={
                      removeBusinessToBrandConnection
                    }
                  />
                ) : businesses && businesses.length > 0 ? (
                  <BusinessList
                    onBusinessClick={onBusinessClick}
                    businesses={businesses || []}
                  />
                ) : (
                  <NoResults
                    onAddBusinessDialogOpen={onAddBusinessDialogOpen}
                  />
                )}
              </Paper>
            </div>
          )
        }}
      </BusinessTypeConsumer>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  }
}

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      {
        success,
        error,
      },
    )(Businesses),
  ),
)
