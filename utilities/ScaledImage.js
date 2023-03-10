import React, { Component } from 'react';
import { Image } from 'react-native';
class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = { source: { uri: this.props.source } };
  }

  UNSAFE_componentWillMount() {
    Image.getSize(this.props.source, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({
          width: this.props.width,
          height: height * (this.props.width / width),
        });
      } else if (!this.props.width && this.props.height) {
        this.setState({
          width: width * (this.props.height / height),
          height: this.props.height,
        });
      } else {
        this.setState({ width: this.props.width, height: this.props.height });
      }
    });
  }

  render() {
    return (
      <Image
        source={this.state.source}
        style={{
          height: this.state.height,
          width: this.state.width,
          ...this.props.style,
          resizeMode: 'cover',
        }}
      />
    );
  }
}
export default ScaledImage;
