import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class ColetarDados extends Component {
    static navigationOptions = {
        title: 'Coletar Dados'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Coletar Dados</Text>
            </View>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});