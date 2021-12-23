import React from 'react';
import {Text, TouchableOpacity, View, Button, ScrollView, SafeAreaView, Alert} from 'react-native';
import {Category} from '../components/category';




export class Categories extends React.Component {

    constructor(props) {
    super(props);
    console.log("categories props", this.props);
    this.categoriesList = [
      {title: 'General', screen: 'general'},
      {title: 'Business', screen: 'business'},
      {title: 'Entertainment', screen: 'entertainment'},
      {title: 'Health', screen: 'health'},
      {title: 'Science', screen: 'science'},
      {title: 'Sport', screen: 'sports'},
      {title: 'Technology', screen: 'technology'},
    ];
  }

  newsLink(category){
        this.props.navigation.navigate({name: "News",params: {"category" : category}});
  }
  render() {
    return (
      <>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
        {this.categoriesList.map(_category => <Category key={_category.screen} title={_category.title} screen={_category.screen} onclick={()=>this.newsLink(_category.screen)}/>)}

        </ScrollView>
        <Button
            title="Favorites"
            style={{position: 'absolute', bottom:0}}
            onPress={() =>
                this.props.navigation.navigate('Favorites', {})
            }
        />
      </>
    );
  }
}
