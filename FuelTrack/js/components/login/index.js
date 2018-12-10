import React, {Component} from "react";
import {Image, Dimensions} from "react-native";
import {
    Container,
    Content,
    Item,
    Input,
    Button,
    Icon,
    View,
    Text,
    H1,
} from "native-base";
import {Field, reduxForm} from "redux-form";
import {setUser} from "../../actions/user";
import {connect} from 'react-redux';
const {height, width} = Dimensions.get('window');

import styles from "./styles";
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

const validate = values => {
    const error = {};
    error.email = "";
    error.password = "";
    var ema = values.email;
    var pw = values.password;
    if (values.email === undefined) {
        ema = "";
    }
    if (values.password === undefined) {
        pw = "";
    }
    if (ema.length < 8 && ema !== "") {
        error.email = "too short";
    }
    if (!ema.includes("@") && ema !== "") {
        error.email = "@ not included";
    }
    if (pw.length > 12) {
        error.password = "max 11 characters";
    }
    if (pw.length < 5 && pw.length > 0) {
        error.password = "Weak";
    }
    return error;
};

class Login extends Component {
    static propTypes = {
        setUser: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: '',
            password: '',
        };
        this.renderInputEmail = this.renderInputEmail.bind(this);
        this.renderInputPassword = this.renderInputPassword.bind(this);
    }

    componentDidMount() {
        this.checkLogin()
    }

    async login(email, pass) {

        try {
            await firebase.auth()
                .signInWithEmailAndPassword(email, pass);

            console.log("Logged In!");
            this.props.navigation.navigate("Home")
            // Navigate to the Home page

        } catch (error) {
            console.log(error.toString())
        }
    }

    checkLogin() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                console.log('giris yapti aq');
                this.props.navigation.navigate("Home")

            } else {
                // No user is signed in.
            }
        });

        // var user = firebase.auth().currentUser;
        //console.log('hopooop', user)
    }

    renderInputEmail({
        input,
        label,
        type,
        meta: {touched, error, warning},
        inputProps
    }) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <View style={{borderRadius: 30, backgroundColor: 'rgba(10, 12, 12, 0.2)'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 12}} error={hasError}>
                    <Icon active name={input.name === "email" ? "person" : "unlock"}/>
                    <Input
                        style={{marginLeft: 5}}
                        placeholder={input.name === "email" ? "EMAIL" : "PASSWORD"}
                        {...input}
                        onChangeText={(t) => this.setState({email: t})}
                    />
                    {hasError
                        ? <Item style={{borderColor: "transparent"}}>
                        <Icon active style={{color: "red", marginTop: 5}} name="bug"/>
                        {/* <Text style={{fontSize: 12, color: "red"}}>{error}</Text>*/}
                    </Item>
                        : <Text />}
                </View>
            </View>
        );
    }

    renderInputPassword({
        input,
        label,
        type,
        meta: {touched, error, warning},
        inputProps
    }) {
        var hasError = false;
        if (error !== undefined) {
            hasError = true;
        }
        return (
            <View style={{borderRadius: 30, backgroundColor: 'rgba(10, 12, 12, 0.2)', marginTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 12}} error={hasError}>
                    <Icon active name={input.name === "password" ? "unlock" : "person"}/>
                    <Input
                        style={{marginLeft: 5}}
                        placeholder={input.name === "password" ? "PASSWORD" : "EMAIL"}
                        {...input}
                        onChangeText={(t) => this.setState({password: t})}
                    />
                    {hasError
                        ? <Item style={{borderColor: "transparent"}}>
                        <Icon active style={{color: "red", marginTop: 5}} name="bug"/>
                        {/* <Text style={{fontSize: 15, color: "red"}}>{error}</Text>*/}
                    </Item>
                        : <Text />}
                </View>
            </View>
        );
    }

    render() {
        return (
            <Container>
                <View style={styles.container}>
                    <Content>
                        <View style={{marginTop: height * 0.08, alignItems: 'center'}}>
                            <H1>BENZİN TAKİP</H1>
                        </View>
                        <View style={styles.bg}>
                            <Field name="email" component={this.renderInputEmail}/>
                            <Field name="password" component={this.renderInputPassword}/>
                            <Button
                                style={styles.btn} rounded
                                //onPress={() => this.signup('abcd@hotmail.com','123456')}
                                onPress={() => this.login(this.state.email, this.state.password)}
                                //onPress={() => this.props.navigation.navigate("Home")}
                            >
                                <Text>Login</Text>
                            </Button>
                            <Button
                                style={styles.btnSignUp}
                                //onPress={() => this.signup('abcd@hotmail.com','123456')}
                                onPress={() => this.props.navigation.navigate("SignUp")}
                                //onPress={() => this.props.navigation.navigate("Home")}
                            >
                                <Text style={{color: 'black'}}>SignUp</Text>
                            </Button>
                        </View>
                    </Content>
                </View>
            </Container>
        );
    }
}


const LoginSwag = reduxForm(
    {
        form: "test",
        validate
    },
    function bindActions(dispatch) {
        return {
            setUser: name => dispatch(setUser(name))
        };
    }
)(Login);
LoginSwag.navigationOptions = {
    header: null
};
export default LoginSwag;
