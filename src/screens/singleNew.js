import React from 'react';
import {
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Linking,
    Button,
    Image, ScrollView
} from 'react-native';
import { observer , inject} from "mobx-react";

import {Header} from "../components/header";

@inject('newsStore')
@observer
export class SingleNew extends React.Component {
    state = {
        disableBtn :false
    };

    updateState = (val) =>{
        console.log("updateState "+this.state.disableBtn);
        this.setState({disableBtn :val });
    };

    constructor(props) {
        super(props);
        console.log("singlenew props" ,this.props);
    }

    componentDidMount(): void {
        const res = this.props.newsStore.checkFavorite(this.props.route.params.item);
        console.log("res=" + res);
        this.updateState(res);
        console.log("didmount disableBtn " + this.state.disableBtn);
    }

    addFavorite(item){
        this.props.newsStore.addFavorite(item);
        this.updateState(true);
        console.log("addFavorite disableBtn " + this.state.disableBtn);
    }
    render() {
        const art = this.props.route.params.item;
        return (
            <>
                <Header title={art.title} />
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <View style={{...styles.sectionContainer, borderBottom:1}}>
                        <Text style={{textAlign:"right"}}>{art.published_at}</Text>
                        <Text style={{textAlign:"left", marginTop:10, marginBottom:10}}>{art.description}</Text>
                        <Image source={{uri: art.image}} style={{width:"100%", height:150}}/>

                        <Text style={{
                            textAlign:"left",
                            marginTop:15,
                            textDecorationLine: "underline",
                            textDecorationStyle: "solid",}}
                              onPress={()=>{Linking.openURL(art.url)}}>
                            {art.url}
                        </Text>
                    </View>
                </ScrollView>
                <Button
                    title="Add To Favorites"
                    disabled={this.state.disableBtn}
                    style={{position: 'absolute', bottom:0 }}
                    onPress={() => this.addFavorite(art)}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});
