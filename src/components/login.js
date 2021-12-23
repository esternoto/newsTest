import React from "react";
import { SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';
import { Colors} from 'react-native/Libraries/NewAppScreen';
import { observer , inject} from "mobx-react";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

@inject('newsStore')
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSigninInProgress : false,
            loggedIn: false
        }
    }
    async componentDidMount() {
        GoogleSignin.configure({
            webClientId: '86568945093-f3tci2ral8g30a50933bfptiuqk1p2jd.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,
        });
        await this.isSignedIn();
        console.log("isLogin="+this.state.loggedIn);
    }
    componentDidUpdate(){
        console.log(this.state.loggedIn);
    }

    signIn = async () => {
        try {
            this.setState({isSigninInProgress:true});
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn();
            {
                if (userInfo) {
                    this.setState({ loggedIn: true });
                    this.setState({isSigninInProgress:false});
                }
                this.props.newsStore.setLogin(true);
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("user cancelled the login flow");
                this.setState({isSigninInProgress:false});
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                console.log("in progress");
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                this.setState({isSigninInProgress:false});
                this.props.newsStore.setLogin(false);
                console.log("service not available");
            } else {
                // some other error happened
                console.log("error=" + JSON.stringify(error));
                this.setState({isSigninInProgress:false});
                this.props.newsStore.setLogin(false);
            }
        }
    };

    isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        this.setState({ loggedIn: isSignedIn });
        this.props.newsStore.setLogin(isSignedIn);
    };

    signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ loggedIn: false });
            this.setState({isSigninInProgress:false});
            this.props.newsStore.setLogin(false);
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
             <SafeAreaView>
                 {!this.state.loggedIn &&
                 <View style={styles.sectionContainer}>
                     <GoogleSigninButton
                         style={styles.buttonContainer}
                         onPress={this.signIn}
                         disabled={this.state.isSigninInProgress}/>
                 </View>
                 }
                 {this.state.loggedIn &&
                 <View style={styles.logoutButton}>
                     <Button onPress={this.signOut}
                             title="Signout">
                     </Button>
                 </View>
                 }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: 192,
        height: 48
    },
    logoutButton: {
        textAlign:"right",
        flexDirection: 'row-reverse',
        marginTop:10,
    },
});
