import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions, InteractionManager} from "react-native";
import {connect} from "react-redux";
import {
    Container,
    CardItem,
    Card,
    Content,
    Text,
    Button,
    Left,
    List,
    Tab,
    Tabs
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

import * as firebase from "firebase";

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class Records extends Component {
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
            user: '',
            expense: [],
            fuel: [],
            username: [],
            recordPrice: '',
            records: [],
            userId: 4,
            selectedTabIndex: 0,
            selectedFuel: [],
            selectedExpense: [],
        };
    }

    componentDidMount() {
        this.getExpenseRecord();
        this.getFuelRecord()
    }

    getExpenseRecord() {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("/user/" + uid + "/record/plate1/expense/" + "/detail/").on('value', (snapshot) => {
            this.setState({expense: snapshot.val()})
        });
    }

    getFuelRecord() {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("/user/" + uid + "/record/plate1/fuel/" + "/detail/").on('value', (snapshot) => {
            this.setState({fuel: snapshot.val()})
        });
    }

    deleteFuelRecord() {
        var uid = firebase.auth().currentUser.uid;
        firebase.database().ref("/user/" + uid + "/record/plate1/fuel/" + "/detail/" + 2).remove();
    }

    changeTab(item) {
        this.setState({selectedTabIndex: item.i});
    }


    renderRowFuel(item) {
        var date = item.when;
        var today = new Date(date);

        return (
            <View>
                <TouchableOpacity onPress={ () => {
                    console.log(this.state.fuel.findIndex(e => e.id === item.id));
                }}
                >
                    <Card>
                        <CardItem>
                            <View style={{flex: 1}}>
                                <View style={{flexDirection: 'column'}}>
                                    <Text>Tarih: {today.toLocaleDateString()}</Text>
                                    <Text>Alinan istasyon: {item.where}</Text>
                                    <Text>Alinan Tutar: {item.fuelPrice}</Text>
                                    <Text>Litre fiyati: {item.priceOfLiter}</Text>
                                    <Text>Alinan litre: {item.amountOfLiter}</Text>
                                    <Text>Gidilebilecek yol: {item.distance}</Text>
                                </View>
                                <View style={{marginTop: 10}}>
                                    <Button
                                        style={{
                                            alignItems: 'center',
                                            alignSelf: 'center',
                                            width: 60,
                                        }}
                                        rounded
                                        large
                                        onPress={ () => {
                                            this.deleteFuelRecord();
                                        }}
                                    >
                                        <Icon name="md-trash" color={'white'} size={34}
                                              style={{width: 30, marginLeft: -6}}></Icon>
                                    </Button>
                                </View>
                            </View>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            </View>
        )
    }

    renderRowExpense(item) {
        var date = item.when;
        var today = new Date(date);
        return (
            <View>
                <Card>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <Text>Tarih: {today.toLocaleDateString()}</Text>
                            <Text>Aciklama {item.description}</Text>
                            <Text>Masraf turu: {item.expenseType}</Text>
                            <Text>Tutar: {item.expensePrice}</Text>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }

    render() {
        var uid = firebase.auth().currentUser.uid;

        return (
            <Container style={styles.container}>
                <Tabs onChangeTab={(item) => this.changeTab(item)}>
                    <Tab heading="Fuel">
                        <Content>
                            <Text>Onceki kayitlariniz:</Text>
                            <List dataArray={this.state.fuel} removeClippedSubviews={false}
                                  renderRow={(item) => this.renderRowFuel(item)}/>
                        </Content>
                    </Tab>
                    <Tab heading="Expense">
                        <Content>
                            <Text>Onceki kayitlariniz:</Text>
                            <List dataArray={this.state.expense} removeClippedSubviews={false}
                                  renderRow={(item) => this.renderRowExpense(item)}/>
                        </Content>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer())
    };
}

const
    mapStateToProps = state => ({
        name: state.user.name,
        index: state.list.selectedIndex,
        list: state.list.list
    });

export default connect(mapStateToProps, bindAction)

(
    Records
);
