import {View, Image, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';

export class AsyncImage extends Component {
  constructor(props) {
    super(props);
    this.state = {loaded: false};
  }

  render() {
    const {placeholderColor, style, source} = this.props;

    return (
      <View style={style}>
        <Image
          source={source}
          resizeMode={'contain'}
          style={[
            style,
            {
              position: 'absolute',
              resizeMode: 'contain',
            },
          ]}
          onLoad={this._onLoad}
        />

        {!this.state.loaded && (
          <View
            style={[
              style,
              {
                backgroundColor: placeholderColor || '#90a4ae',
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
              },
            ]}
          >
            <ActivityIndicator size="large" />
          </View>
        )}
      </View>
    );
  }

  _onLoad = () => {
    // This only exists so the transition can be seen
    // if loaded too quickly.
    setTimeout(() => {
      this.setState(() => {
        return {loaded: true};
      });
    }, 1000);
  };
}
