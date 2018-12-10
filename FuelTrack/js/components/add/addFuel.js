import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions, ListView} from "react-native";
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
    Input,
    Card,
    CardItem,
    Item,
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class AddFuel extends Component {
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
        this.database = firebase.database();
        this.state = {
            user: '',
            username: [],
            recordPrice: '',
            records: [],
            userId: 4,
            liter: 0,
            price: 0,
            averageConsume: '6',
            count: 1
        };
        this.sendFuelRecord = this.sendFuelRecord.bind(this);
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

    sendFuelRecord() {
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref("/user/" + uid + "/record/plate1/fuel/" + "/detail/" + this.state.count).set({
            when: new Date().getTime(),
            fuelPrice: this.state.price,
            where: this.state.station,
            priceOfLiter: this.state.liter,
            amountOfLiter: this.amountOfTakingFuel(),
            distance: this.distance(),
        });
        this.setState({
            count: this.state.count+1
    })

    }

    amountOfTakingFuel() {
        //console.log(this.state.price / this.state.liter, this.state.price)
        if (this.state.price != 0 && this.state.liter != 0) {
            let result = this.state.price / this.state.liter;
            return Math.round(result).toString();
        }
    }

    distance() {
        var literPrice = this.state.liter;
        var consumeOfCar = this.state.averageConsume;
        var price = this.state.price;
        if (this.state.price != 0 && this.state.liter != 0) {
            var totalDistance = (100 * price) / (literPrice * consumeOfCar);
            return Math.round(totalDistance).toString();
        }
    }

    renderCard() {
        //console.log(this.state.price)
        var today = new Date();
        return (
            <View style={{alignItems: 'center'}}>
                <Card style={{width: width * 0.85}}>
                    <CardItem>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={styles.addText}>
                                    Tarih :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Text>{today.toLocaleDateString()}</Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 5
                                }}>
                                <Text style={styles.addText}>
                                    Alinan Istasyon :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100, marginLeft: width * 0.2}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            onChangeText={(t) => this.setState({station: t})}
                                            value={this.state.station}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={styles.addText}>
                                    Alinan Tutar :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            onChangeText={(t) => this.setState({price: t})}
                                            keyboardType='numeric'
                                            value={this.state.price}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={styles.addText}>
                                    Litre Fiyati :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            onChangeText={(t) => this.setState({liter: t})}
                                            keyboardType='numeric'
                                            value={this.state.liter}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={styles.addText}>
                                    Ortalama Yakit Tuketimi :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            editable={false}
                                            keyboardType='numeric'
                                            value={this.state.averageConsume}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5
                            }}>
                                <Text style={styles.addText}>
                                    Alinan Litre :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            editable={false}
                                            keyboardType='numeric'
                                            //placeholder={this.amountOfTakingFuel()}
                                            value={this.amountOfTakingFuel()}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 5,
                                marginBottom: 10
                            }}>
                                <Text style={styles.addText}>
                                    Gidilebilecek Yol :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            editable={false}
                                            keyboardType='numeric'
                                            value={this.distance()}
                                        />
                                    </Item>
                                </View>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Button
                                    style={{
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        width: 60,
                                    }}
                                    success
                                    rounded
                                    large

                                    onPress={ () => {
                                        this.sendFuelRecord();
                                    }}
                                >
                                    <Icon name="md-add" color={'white'} size={34}
                                          style={{width: 30, marginLeft: -6}}></Icon>
                                </Button>
                            </View>
                        </View>
                    </CardItem>
                </Card>
            </View>
        )
    }

    render() {
        // console.log(this.state.user)

        return (
            <Container style={styles.container}>
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
                    <Title style={{color: 'white'}}>Add Fuel</Title>
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
                <Content padder>
                    <Text>Benzin ekle</Text>
                    {this.renderCard()}
                </Content>
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
    AddFuel
);
