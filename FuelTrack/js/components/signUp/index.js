import React, {Component} from "react";
import {Image} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    Content,
    Item,
    Input,
    Button,
    Icon,
    View,
    Text,
    Header,
    Left,
    Body,
    Title,
    Right
} from "native-base";
import {Field, reduxForm} from "redux-form";
import {setUser} from "../../actions/user";
import styles from "./styles";
import * as firebase from "firebase";

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyA29FldepWaIgYA-0CvJmiGWWStz6CSc5M",
        authDomain: "benzintakip-5f005.firebaseapp.com",
        databaseURL: "https://benzintakip-5f005.firebaseio.com",
        projectId: "benzintakip-5f005",
        storageBucket: "benzintakip-5f005.appspot.com",
        messagingSenderId: "30644784413"
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

class SignUp extends Component {
    static propTypes = {
        setUser: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: '',
            password: '',
            user: '',
            username: [],
            recordPrice: '',
            records: [],
            userId: 4,
            firstname: '',
            lastname: ''
        };
        this.renderInputEmail = this.renderInputEmail.bind(this);
        this.renderInputPassword = this.renderInputPassword.bind(this);
        this.createDatabase = this.createDatabase.bind(this);

    }

    async signup(email, pass) {

        try {
            await firebase.auth()
                .createUserWithEmailAndPassword(email, pass);

            console.log("Account created");
            console.log('hoooop', firebase.auth().currentUser.uid);
            this.createDatabase();
            this.props.navigation.navigate("Home")
            // Navigate to the Home page, the user is auto logged in

        } catch (error) {
            console.log(error.toString())
        }
    }

    createDatabase() {
        var uid = firebase.auth().currentUser.uid;
        var name = firebase.auth().currentUser;
        var email = firebase.auth().currentUser.email;
        var plate1 = this.state.licensePlate1;
        var plate2 = this.state.licensePlate2;

        //console.log(name)
        firebase.database().ref("/user/" + uid + "/personalInfo/").set({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: email,
            session: true
        });
        firebase.database().ref("/user/" + uid + "/carInfo/").set({
            brand: 'volvo',
            model: 's90',
            fuelConsumption: '6',
        });
        firebase.database().ref("/user/" + uid + "/record/plate1").set({});
        firebase.database().ref("/user/" + uid + "/record/plate2").set({});
        firebase.database().ref("/user/" + uid + "/record/plate1/fuel").set({});
        firebase.database().ref("/user/" + uid + "/record/plate1/expense").set({});
        firebase.database().ref("/user/" + uid + "/record/plate2/fuel").set({});
        firebase.database().ref("/user/" + uid + "/record/plate2/expense").set({});
    }

    renderName() {
        return (
            <View style={{borderRadius: 30, backgroundColor: 'rgba(10, 12, 12, 0.2)'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 12}}>
                    <Input
                        style={{marginLeft: 5}}
                        placeholder={'Adınız'}
                        onChangeText={(t) => this.setState({firstname: t})}
                    />
                </View>
            </View>
        )
    }

    renderLastName() {
        return (
            <View style={{borderRadius: 30, backgroundColor: 'rgba(10, 12, 12, 0.2)', marginTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 12}}>
                    <Input
                        style={{marginLeft: 5}}
                        placeholder={'Soyadınız'}
                        onChangeText={(t) => this.setState({lastname: t})}
                    />
                </View>
            </View>
        )
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
            <View style={{borderRadius: 30, backgroundColor: 'rgba(10, 12, 12, 0.2)', marginTop: 10}}>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 12}} error={hasError}>
                    <Icon active name={input.name === "email" ? "person" : "unlock"}/>
                    <Input
                        style={{marginLeft: 5}}
                        placeholder={input.name === "email" ? "email" : "şifre"}
                        {...input}
                        onChangeText={(t) => this.setState({email: t})}
                    />
                    {hasError
                        ? <Item style={{borderColor: "transparent"}}>
                        <Icon active style={{color: "red", marginTop: 5}} name="bug"/>
                        {/*<Text style={{fontSize: 15, color: "red"}}>{error}</Text>*/}
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
                    <Icon
                        active name={input.name === "password" ? "unlock" : "person"}/>
                    <Input
                        style={{marginLeft: 5}}
                        placeholder={input.name === "password" ? "şifre" : "email"}
                        {...input}
                        onChangeText={(t) => this.setState({password: t})}
                    />
                    {hasError
                        ? <Item style={{borderColor: "transparent"}}>
                        <Icon active style={{color: "red", marginTop: 5}} name="bug"/>
                        {/*<Text style={{fontSize: 15, color: "red"}}>{error}</Text>*/}
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
                    <Header style={{backgroundColor: '#031499'}}>
                        <Left>
                            {/*
                             <Button
                             transparent
                             onPress={() => {
                             DrawerNav.dispatch(
                             NavigationActions.reset({
                             index: 0,
                             actions: [NavigationActions.navigate({routeName: "Home"})]
                             })
                             );
                             DrawerNav.goBack();
                             }}
                             >
                             <Icon active name="power"/>
                             </Button>
                             */}
                        </Left>
                        <Body>
                        <Title style={{color: 'white'}}>Kayıt Ol</Title>
                        </Body>
                        <Right>
                            {/*
                             <Button
                             transparent
                             onPress={() => this.props.navigation.navigate("Login")}
                             >
                             <Icon active name="menu" />
                             </Button>
                             */}
                        </Right>
                    </Header>
                    <Content>
                        <View style={styles.bg}>
                            {this.renderName()}
                            {this.renderLastName()}
                            <Field name="email" component={this.renderInputEmail}/>
                            <Field name="password" component={this.renderInputPassword}/>
                            <Button
                                rounded
                                style={styles.btn}
                                onPress={() => this.signup(this.state.email, this.state.password)}
                                // onPress={() => this.props.navigation.navigate("Home")}
                            >
                                <Text>SignUp</Text>
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
)(SignUp);
LoginSwag.navigationOptions = {
    header: null
};
export default LoginSwag;
