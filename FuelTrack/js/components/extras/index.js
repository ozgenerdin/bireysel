import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions} from "react-native";
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

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class Settings extends Component {
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
            distance: 0,
            literPrice: 0,
            expense: 0,
            button: false,
            button1: false,
        };
    }

    experimentFuelPrice() {
        var literPrice = this.state.literPrice;
        var distance = this.state.distance;
        console.log(typeof distance)
        var spentFuel = 5;
        if (this.state.button) {
            var result = (distance / 100) * spentFuel * literPrice;
            return Math.round(result);
        }
        if (this.state.button)
            this.setState({
                button: false,
            })
    }

    experimentTotalPrice() {
        var fuelPrice = this.experimentFuelPrice();
        var expensePrice = parseInt(this.state.expense);
//console.log(typeof fuelPrice)
//console.log(typeof expensePrice)
        if (this.state.button1) {
            var totalPrice = (fuelPrice + expensePrice);
            return Math.round(totalPrice);
        }
        if (this.state.button1)
            this.setState({
                button1: false
            })
    }

    render() {
        console.log("--->",this.props);
        return (
            <View style={styles.container}>
                <Container>
                    <Content>
                        <View>
                            <Text style={styles.explainText}>Gideceginiz yolun yakit ve diger yol masraflarini
                                hesaplayabilirsiniz</Text>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text>Mesafe Girin:</Text>
                                <View style={{width: 100}}>
                                    <Input
                                        style={{color: 'black', height: 30, width: 100, fontSize: 14, borderWidth: 1}}
                                        onChangeText={(distance) => this.setState({distance})}
                                        keyboardType='numeric'
                                        value={this.state.distance}
                                    />
                                </View>
                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text>Benzin Litre Fiyati Girin:</Text>
                                <View style={{width: 100}}>
                                    <Input
                                        style={{color: 'black', height: 30, width: 100, fontSize: 14, borderWidth: 1}}
                                        onChangeText={(literPrice) => this.setState({literPrice})}
                                        keyboardType='numeric'
                                        value={this.state.literPrice}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Button style={{height: 40, backgroundColor: '#031499'}} onPress={() => {
                                    this.setState({
                                        button: true
                                    })
                                }}>
                                    <Text>Hesapla</Text>
                                </Button>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text>
                                    Aracinizin yakit masrafi: {this.experimentFuelPrice()} TL
                                </Text>
                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Text>Ekstra masraf ekle:</Text>
                                <View style={{width: 100}}>
                                    <Input
                                        style={{color: 'black', height: 30, width: 100, fontSize: 14, borderWidth: 1}}
                                        onChangeText={(expense) => this.setState({expense})}
                                        keyboardType='numeric'
                                        value={this.state.expense}
                                    />
                                </View>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Button
                                    style={{height: 40, backgroundColor: '#031499'}} onPress={() => {
                                        this.setState({
                                            button1: true
                                        })
                                    }}>
                                    <Text>Hesapla</Text>
                                </Button>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text>
                                    Aracinizin toplam yol masrafi: {(this.experimentTotalPrice())} TL
                                </Text>
                            </View>
                        </View>
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
    mapStateToProps = state => ({
        name: state.user.name,
        index: state.list.selectedIndex,
        list: state.list.list
    });

export default connect(mapStateToProps, bindAction)

(
    Settings
);
