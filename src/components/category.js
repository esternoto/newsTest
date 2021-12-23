import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
export class Category extends React.Component {
  constructor(props) {
    super(props);
    console.log("category props" ,this.props);
  }
  render() {

    return (
      <View style={styles.sectionContainer}>
        <TouchableOpacity onPress={()=>this.props.onclick()}>
          <Text>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    borderBottom:1
  },
});
