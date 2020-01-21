import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import StarIcon from '@material-ui/icons/Star'

const styles = theme => ({
  stars: {
    justifyContent: 'center',
    display: 'flex',
    height: 24,
  },
  star: {
    cursor: 'pointer',
    fill: '#d0d0d0;',
  },
  selected: {
    cursor: 'pointer',
    fill: '#04E762',
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

class RatingSelect extends PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      selected: 0,
    }
  }

  handleRatingClick = rating => () => {
    this.setState({ selected: rating === this.state.selected ? 0 : rating })
    this.props.onClick(rating === this.state.selected ? 0 : rating)
  }

  render() {
    const { classes } = this.props
    const { selected } = this.state
    return (
      <div className={classes.stars}>
        {[1, 2, 3, 4, 5].map(number => {
          return (
            <div
              key={`star-key-${number}`}
              className={classes.full}
              onClick={this.handleRatingClick(number)}
            >
              {selected >= number ? (
                <StarIcon
                  key={`${number}-star-icon-key`}
                  className={classNames(
                    classes.star,
                    selected ? classes.selected : null,
                  )}
                />
              ) : (
                <StarBorderIcon
                  className={classNames(
                    classes.star,
                    selected ? classes.selected : null,
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

RatingSelect.propTypes = {}

export default withStyles(styles)(RatingSelect)
