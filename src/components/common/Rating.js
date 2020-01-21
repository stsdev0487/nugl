import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

const styles = theme => ({
  stars: {
    justifyContent: 'center',
    display: 'flex',
    height: 24,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  star: {
    fill: '#04E762',
  },
  greyStar: {
    fill: '#d0d0d0',
  },
  full: {
    width: 24,
  },
  left: {
    overflow: 'hidden',
    width: 12,
  },
  right: {
    overflow: 'hidden',
    direction: 'rtl',
    width: 12,
  },
})

class Ratings extends PureComponent {
  renderStars = () => {
    const {
      classes,
      rating,
      onMouseOver,
      onMouseOut,
      ...otherProps
    } = this.props
    return (
      <div className={classes.stars} {...otherProps}>
        {[1, 2, 3, 4, 5].map(number => {
          return (
            <div key={number} className={classes.full}>
              {rating >= number ? (
                <StarIcon
                  className={classNames(
                    classes.star,
                    rating === 0 ? classes.greyStar : null,
                  )}
                />
              ) : (
                <StarBorderIcon
                  className={classNames(
                    classes.star,
                    rating === 0 ? classes.greyStar : null,
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return this.renderStars()
  }
}

Ratings.propTypes = {
  rating: PropTypes.number.isRequired,
}

export default withStyles(styles)(Ratings)
