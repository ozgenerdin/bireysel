import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions, InteractionManager} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Left,
    Right,
    Body,
    Input
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Settings from '../settings'
import Extras from '../extras'
import Record from '../records'

import * as firebase from "firebase";

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class FooterTabs extends Component {
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
        super(props);
        this.state = {
            distance: '',
            literPrice: '',
            expense: '',
            result: 0,
            button: false,
            personalInfo: []
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.getName();
        });
    }

    getName() {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("/user/" + uid + "/personalInfo").on('value', (snapshot) => {
            this.setState({personalInfo: snapshot.val()})
        });
    }

    renderTab() {
        console.log("ana proplar",this.props);
        let tabType = this.props.type;
        switch (tabType) {
            case "HOME":
                return <View>
                    <Text>Merhaba {this.state.personalInfo.firstname}</Text>
                </View>
                break;
            case "RECORDS":
                return <Record/>
                break;
            case "EXTRAS":
                return <Extras navstuff="OMER"/>
                break;
            case "SETTINGS":
                return <Settings navstuff={this.props}/>
                break;
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content padder>
                    {this.renderTab()}
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer())
    };
}

const mapStateToProps = state => ({
    name: state.user.name,
    index: state.list.selectedIndex,
    list: state.list.list
});


export default connect(mapStateToProps, bindAction)(FooterTabs);
