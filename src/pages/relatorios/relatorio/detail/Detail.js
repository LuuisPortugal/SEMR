import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class Detail extends Component {
    static navigationOptions = {
        title: 'Detalhe'
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.information}></View>
                <View style={styles.graphics}></View>
            </View>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    
    information: {
        flex: 1
    },

    graphics: {
        flex: 3
    }
});