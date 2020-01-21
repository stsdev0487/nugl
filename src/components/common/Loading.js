import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'
import { hideLoading } from '../../store/actions/loadingActions'
import { loading, pop } from '../../store/actions/messageActions'

const styles = () => ({
  main: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },
})

// 20 seconds
const DEFAULT_TIMEOUT = 20000

class Loading extends Component {
  componentDidMount() {
    const { loading, showLoading } = this.props
    this.timeout = setTimeout(this.stop, loading.timeout || DEFAULT_TIMEOUT)
    if (loading.text) {
      showLoading(loading.text, loading.timeout)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
    this.stop()
  }

  stop = () => {
    const { loading, pop, hideLoading } = this.props
    hideLoading()
    if (loading.text) {
      pop()
    }
  }

  render() {
    const { showCenterIndicator = true, classes } = this.props
    return showCenterIndicator ? (
      <div className={classes.main}>
        <CircularProgress size={60} />
      </div>
    ) : (
      <Fragment />
    )
  }
}

Loading.propTypes = {
  hideLoading: PropTypes.func.isRequired,
}

export default withStyles(styles)(
  connect(
    ({ loading }) => ({ loading }),
    { showLoading: loading, pop, hideLoading },
  )(Loading),
)
