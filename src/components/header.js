import React from 'react';
import {
  StyleSheet,
  Text
} from 'react-native';

export class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <Text style={styles.title}>{this.props.title}</Text>;
  }
}

const styles = StyleSheet.create({
  title : {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: 10
  }
});
