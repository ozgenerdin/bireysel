
const React = require('react-native');

const { StyleSheet, Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

export default{
    container: {
        backgroundColor: '#FBFAFA',
    },
    explainText: {
        fontSize: 12
    },
    titleText: {
        fontSize: 14,
    },
    addText: {
        fontSize: 14,
        color: 'red'
    }
};
