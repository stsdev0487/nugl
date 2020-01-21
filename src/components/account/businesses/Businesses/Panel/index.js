import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'

import EditDialog from '../../EditDialog'
import DeleteDialog from '../../DeleteDialog'
import { success, error } from '../../../../../store/actions/messageActions'
import BusinessesTabs from './Tabs'
import styles from './styles'

class BusinessPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      autoAddList: {},
      editing: false,
      type: '',
      deleteDialogOpen: false,
      addDialogOpen: false,
    }
  }

  handleClick = type => () =>
    this.setState({
      editing: true,
      type,
    })

  handleCloseDialog = () =>
    this.setState({
      editing: false,
      type: '',
    })

  handleDeleteDialogOpen = open => e => {
    e.stopPropagation()
    this.setState({ deleteDialogOpen: open })
  }

  handleCloseDeleteDialog = () => this.setState({ deleteDialogOpen: false })

  handleDeleteBusinessSubmit = ({ type, reason, description }) => {
    const {
      onSubmitRemoval,
      business: { id, userId, name },
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

  handleClick = type => () =>
    this.setState({
      editing: true,
      type,
    })

  handleCloseDialog = () =>
    this.setState({
      editing: false,
      type: '',
    })

  handleDeleteDialogOpen = open => e => {
    e.stopPropagation()
    this.setState({ deleteDialogOpen: open })
  }

  handleCloseDeleteDialog = () => this.setState({ deleteDialogOpen: false })

  handleDeleteBusinessSubmit = ({ type, reason, description }) => {
    const {
      onSubmitRemoval,
      business: { id, userId, name },
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

  handleAutoAddList = value => {
    const { autoAddList } = this.state
    const toggledValue = !autoAddList[value]

    if (toggledValue) {
      autoAddList[value] = toggledValue
    } else {
      delete autoAddList[value]
    }

    this.setState({
      autoAddList,
    })
  }

  render() {
    const {
      handleClick,
      handleCloseDialog,
      handleDeleteDialogOpen,
      handleCloseDeleteDialog,
      handleDeleteBusinessSubmit,
    } = this

    const {
      tab,
      onPublishToggle,
      onFeatureToggle,
      onSubmit,
      onBackClick,
      profile,
      business,
      updateSelectedBusiness,
      removeBusinessToBrandConnection,
      connectBusinessToBrand,
    } = this.props

    const { deleteDialogOpen } = this.state
    return (
      <Fragment>
        <EditDialog
          {...this.state}
          business={business}
          onClose={handleCloseDialog}
          updateSelectedBusiness={updateSelectedBusiness}
          onSubmit={onSubmit}
          onBackClick={onBackClick}
          removeBusinessToBrandConnection={removeBusinessToBrandConnection}
          connectBusinessToBrand={connectBusinessToBrand}
        />
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          onSubmitRemoval={handleDeleteBusinessSubmit}
        />

        <Paper>
          <BusinessesTabs
            handleDeleteDialogOpen={handleDeleteDialogOpen}
            handleClick={handleClick}
            tab={tab}
            business={business}
            profile={profile}
            onPublishToggle={onPublishToggle}
            onFeatureToggle={onFeatureToggle}
          />
        </Paper>
      </Fragment>
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
  connect(
    mapStateToProps,
    {
      success,
      error,
    },
  )(BusinessPanel),
)
