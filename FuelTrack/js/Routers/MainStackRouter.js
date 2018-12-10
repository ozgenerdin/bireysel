import React, {Component} from "react";
import Login from "../components/login/";
import SignUp from "../components/signUp";
import Home from "../components/home/";
import BlankPage from "../components/blankPage";
import HomeDrawerRouter from "./HomeDrawerRouter";
import FooterTabs from "../components/footerTabs";
import AddFuel from "../components/add/addFuel";
import AddExpense from "../components/add/addExpense";
import Extras from "../components/settings/index";
import StartPage from "../components/start";
import {StackNavigator} from "react-navigation";
import {Header, Left, Button, Icon, Body, Title, Right} from "native-base";
HomeDrawerRouter.navigationOptions = ({navigation}) => ({
    header: null
});
export default (StackNav = StackNavigator({
    StartPage: {screen: StartPage},
    login: {screen: Login},
    SignUp: {screen: SignUp},
    Home: {screen: Home},
    BlankPage: {screen: BlankPage},
    FooterTabs: {screen: FooterTabs},
    AddFuel: {screen: AddFuel},
    AddExpense: {screen: AddExpense},
    Extras: {screen: Extras},
}));
