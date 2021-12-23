import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { observer , inject} from "mobx-react";
import {Header} from "../components/header";
import {FlatList} from "react-native-gesture-handler";


@inject('newsStore')
@observer
export class News extends React.Component {

    constructor(props) {
        super(props);
        console.log("news props", this.props);
        this.category = this.props.route.params.category;
        props.newsStore.setPendingNews(true);
        props.newsStore.fetchNewsData(this.category);
    }

    onClick(item){
        this.props.navigation.navigate({name: "SingleNew",params: {"item" : item}});
    }

    render() {
        console.log("render news");
        let { news, pendingNews } = this.props.newsStore;
        let key=1;

        return (
            <>
                <Header title={ this.category.charAt(0).toUpperCase() + this.category.slice(1)} />
                {pendingNews ?
                <Text>...loading </Text> :
                    news[this.category].length === 0 ?
                <Text> Any news where found :( </Text> :
                <FlatList
                    style={styles.sectionContainer}
                    data={news[this.category]}
                    keyExtractor={(item) => key++}
                    renderItem={({ item }) => (
                        <View style={styles.titleNew} >
                            <TouchableOpacity onPress={() => {this.onClick(item)}}>
                                <Text > {item.title}</Text>
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
    sectionContainer: {
        marginTop: 12,
        paddingHorizontal: 18,
        textAlign: "left",
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
    }
});
