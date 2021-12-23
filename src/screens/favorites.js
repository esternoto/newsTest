import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { observer , inject} from "mobx-react";
import {FlatList} from "react-native-gesture-handler";
import Login from "../components/login";

@inject('newsStore')
@observer
export class Favorites extends React.Component {


    constructor(props) {
        super(props);
        console.log("favorites props", this.props);
    }
    removeFavorite(item){
        this.props.newsStore.removeFavorite(item);
    }
    openItem(item){
        this.props.navigation.navigate({name: "SingleNew",params: {"item" : item}});
    }

    async componentDidMount(){
        console.log ("fav did mount "+ this.props.newsStore.isLogin)
    }

    render() {
        let { isLogin ,favorites } = this.props.newsStore;
        let key=1;
        console.log("fav render islogin=" + isLogin);
        return (
                <>
                    <Login />
                    {isLogin && favorites.length === 0 ?
                        <Text> Any favorites where found :( </Text>
                        : isLogin &&
                        <FlatList
                            style={styles.list}
                            data={favorites}
                            keyExtractor={(item) => key++}
                            renderItem={({item}) => (
                                <View style={styles.titleNew}>
                                    <TouchableOpacity onPress={() => {
                                        this.openItem(item)
                                    }}>
                                        <Text> {item.title}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        this.removeFavorite(item)
                                    }}>
                                        <Text style={styles.removeNew} >
                                            remove from favorites</Text>
                                    </TouchableOpacity>
                                </View>

                            )}
                        />
                    }
                </>
        )
    }
}
const styles = StyleSheet.create({
    list:{
        marginTop: 32,
        paddingHorizontal: 24
    },
    titleNew: {
        marginTop: 16,
        marginRight:10,
        marginLeft:10,
        paddingBottom:10,
        flex: 1,
        textAlign: "left",
        borderBottomColor:"#999",
        borderBottomWidth:2,
    },
    removeNew:{
        color: "red",
        fontSize: 10,
        textAlign: "right"
    },
});
