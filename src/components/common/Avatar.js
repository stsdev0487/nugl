import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'

import ImagePlaceholder from '../../static/images/default-profile.png'
import BannerPlaceholder from '../../static/images/default-banner.jpg'

const styles = () => ({})

class Avatar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      imageSource: props.banner ? BannerPlaceholder : ImagePlaceholder,
    }
  }

  componentDidMount() {
    this.checkImage(this.props.source)
  }

  componentWillReceiveProps({ source }) {
    if (source && source !== this.props.source) {
      this.checkImage(source)
    }
  }

  checkImage = imageSource => {
    const image = new Image()

    image.src = imageSource
    image.onload = () => {
      this.setState({ imageSource })
    }
  }

  render() {
    const { imageSource } = this.state
    const { title, className, children } = this.props
    return (
      <CardMedia
        image={imageSource}
        title={title}
        className={className}
        component={media => (
          <div className={media.className} style={media.style}>
            {children}
          </div>
        )}
      />
    )
  }
}

export default withStyles(styles)(Avatar)
