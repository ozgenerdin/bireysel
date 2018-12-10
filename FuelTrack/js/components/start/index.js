import React, {Component} from "react";
import {Image, Dimensions, InteractionManager} from "react-native";
import {
    Container,
    Content,
    View,
    Text,
    H1,
} from "native-base";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
const {height, width} = Dimensions.get('window');
import styles from "./styles";
import {setUser} from "../../actions/user";

import * as firebase from "firebase";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyA29FldepWaIgYA-0CvJmiGWWStz6CSc5M",
        authDomain: "benzintakip-5f005.firebaseapp.com",
        databaseURL: "https://benzintakip-5f005.firebaseio.com",
        projectId: "benzintakip-5f005",
        storageBucket: "benzintakip-5f005.appspot.com",
    });
}

class StartPage extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
      this.checkLogin();
    }

    async checkLogin() {
        await firebase.auth().onAuthStateChanged((user) => {
            console.log('aaa', user)
            if (user) {
                // User is signed in.
                console.log('giris yapti aq');
                this.props.navigation.navigate("Home")

            } else {
                // No user is signed in.
                console.log('logine gitmesi lazim')
                this.props.navigation.navigate("login")

            }
        });
        // var user = firebase.auth().currentUser;
        //console.log('hopooop', user)
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Content>
                        <View style={{marginTop: height * 0.08, alignItems: 'center'}}>
                            <H1>BENZİN TAKİP</H1>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 50}}>
                            <Image
                                style={{alignItems: 'center', height: 250}}
                                source={require('../../../images/fueltrackimage1.jpeg')}
                            >
                            </Image>
                        </View>
                    </Content>
                </View>
            </Container>
        )
    }
}

const LoginSwag = reduxForm(
    {
        form: "test",
    },
    function bindActions(dispatch) {
        return {
            setUser: name => dispatch(setUser(name))
        };
    }
)(StartPage);
LoginSwag.navigationOptions = {
    header: null
};
export default LoginSwag;
