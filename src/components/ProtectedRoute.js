import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class ProtectedRoute extends Component {
  state = {
    loaded: false,
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.profile && nextProps.profile) {
      this.setState({ loaded: true })
    }
  }

  render() {
    const { component: Component, ...rest } = this.props
    const { profile } = this.props
    const { loaded } = this.state
    const { pathname, search } = window.location
    return (
      <Route
        {...rest}
        render={props => {
          if (!loaded) {
            return <div />
          }
          return profile ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/sign-in?returnUrl=${pathname}${search}`} />
          )
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    profile: state.profile,
  }
}

export default connect(
  mapStateToProps,
  {},
)(ProtectedRoute)
