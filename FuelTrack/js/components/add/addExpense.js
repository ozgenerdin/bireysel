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
    Picker
} from "native-base";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from "firebase";

const {height, width} = Dimensions.get('window');

import styles from "./styles";

class AddExpense extends Component {
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
            description: '',
            expPrice: '',
            expenseType: null
        };
        this.recordsRef = this.database.ref('records');
        this.sendExpenseRecord = this.sendExpenseRecord.bind(this);
    }

    sendExpenseRecord() {
        var uid = firebase.auth().currentUser.uid;

        firebase.database().ref("/user/" + uid + "/record/plate1/expense/" + "/detail/" + 2).set({
            description: this.state.description,
            expenseType: this.state.expenseType,
            when: new Date().getTime(),
            expensePrice: this.state.expPrice
        });
    }

    /*sendRecord() {
     this.recordsRef.transaction((records) =>{
     if(!records){
     records = [];
     }
     records.push(this.state.records);
     this.setState({record:''});
     return records;
     });
     }
     /*}

     */

    renderCard() {
        var today = new Date();
        return (
            <View style={{alignItems: 'center'}}>
                <Card style={{width: width * 0.85}}>
                    <CardItem>
                        <View style={{flexDirection: 'column', flex: 1}}>
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
                                    Masraf Turu :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Picker
                                        style={{
                                            marginLeft: 25,
                                        }}
                                        textStyle={{
                                            borderBottomColor: '#3B5999',
                                            color: '#3B5999',
                                        }}
                                        iosHeader={'asd'}
                                        onValueChange={(expenseType) => this.setState({expenseType})}
                                        selectedValue={this.state.expenseType}>
                                        <Picker.Item label="Seçiniz" value={null}/>
                                        <Picker.Item label="Otoyol" value="otoyol"/>
                                        <Picker.Item label="Kopru" value="kopru"/>
                                        <Picker.Item label="Lastik" value="lastik"/>
                                        <Picker.Item label="Bakim" value="bakim"/>
                                    </Picker>
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
                                    Tutar :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100, marginLeft: width * 0.2}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            onChangeText={(t) => this.setState({expPrice: t})}
                                            value={this.state.expPrice}
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
                                    Aciklama :
                                </Text>
                                <View style={{alignItems: 'flex-end'}}>
                                    <Item style={{width: 100}}>
                                        <Input
                                            style={{
                                                height: 30,
                                                fontSize: 14,
                                            }}
                                            onChangeText={(t) => this.setState({description: t})}
                                            keyboardType='numeric'
                                            value={this.state.description}
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
                                        this.sendExpenseRecord();
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
        console.log(this.state.user)

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
                    <Title style={{color: 'white'}}>Add Expense</Title>
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
                    <Text>Masraf ekle</Text>
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
    AddExpense
);
