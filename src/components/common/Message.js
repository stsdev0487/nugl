import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { pop } from '../../store/actions/messageActions'
import MessageTypes from '../../const/MessageTypes'

class Message extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      message: props.message ? Object.assign({}, props.message) : null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message !== this.props.message) {
      this.setState({
        message: nextProps.message
          ? Object.assign({}, nextProps.message)
          : null,
      })
    }
  }

  handleClose = () => {
    this.props.pop()
  }

  render() {
    const { message } = this.state
    return (
      <div>
        {message !== null && (
          <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            open
            autoHideDuration={
              MessageTypes.LOADING ? message.timeout || 20000 : 5000
            }
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id',
              key: 'snackbar-message-key',
            }}
            style={{ textAlign: 'center' }}
            message={
              message.type === 'custom' ? (
                message.custom
              ) : (
                <span id="message-id">{message.text}</span>
              )
            }
            action={[
              message.type === MessageTypes.LOADING ? (
                <CircularProgress
                  key={`loading-indicator-in-${message.type}`}
                  size={24}
                />
              ) : (
                <IconButton
                  key={`close-button-for-message-${message.type}`}
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  <CloseIcon />
                </IconButton>
              ),
            ]}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.messages.length > 0 ? state.messages[0] : null,
  }
}

export default connect(
  mapStateToProps,
  { pop },
)(Message)
