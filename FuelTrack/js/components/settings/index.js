import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    Header,
    ListItem,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    List
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');
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

import styles from "./styles";

class Extras extends Component {
    static navigationOptions = {
        header: null
    };
    static propTypes = {
        name: React.PropTypes.string,
        index: React.PropTypes.number,
        list: React.PropTypes.arrayOf(React.PropTypes.string),
        openDrawer: React.PropTypes.func
    };

    constructor(props) {
        console.log("----once");
        console.log(props);
        super(props);
        console.log(props);
        this.state = {
            distance: '',
            literPrice: '',
            expense: '',
            result: 0,
            button: false
        };
    }


    async logout() {

        try {

            await firebase.auth().signOut();

            // Navigate to login view

        } catch (error) {
            console.log(error);
        }

    }

    render() {
        let that = this;
        return (
            <View style={styles.container}>
                <Container>
                    <Content>
                        <List>
                            <ListItem icon>
                                <Left>
                                    <Icon
                                        name='id-card-o'
                                        size={20}
                                    />
                                </Left>
                                <Body>
                                <Text>Plaka Ayarlari</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon
                                        name='question-circle'
                                        size={20}
                                    />
                                </Left>
                                <Body>
                                <Text>About</Text>
                                </Body>
                            </ListItem>
                            <ListItem icon button
                                      onPress={() => {
                                          console.log(this.props)
                                      }}>
                                <Left>
                                    <Icon
                                        name='sign-out'
                                        size={20}
                                    />
                                </Left>
                                <Body>
                                <Text>Çıkış</Text>
                                </Body>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer())
    };
}

const
    mapStateToProps = state  => ({
        name: state.user.name,
        index: state.list.selectedIndex,
        list: state.list.list
    });




export default connect(mapStateToProps, bindAction)(Extras);
