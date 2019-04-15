import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class Inicio extends Component {
    static navigationOptions = {
        title: 'SEMR'
    }

    onPressButtonColetarDados = () => 
        this.props.navigation.navigate('ColetarDados');

    onPressButtonRelatorios = () => 
        this.props.navigation.navigate('Relatorios');

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.btnAction} onPress={this.onPressButtonColetarDados}>
                    <Text style={styles.btnActionText}>Coletar Dados</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnAction} onPress={this.onPressButtonRelatorios}>
                    <Text style={styles.btnActionText}>Relatórios</Text>
                </TouchableOpacity>
            </View>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    btnAction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnActionText: {
        fontSize: 17,
        fontWeight: '400'
    }
});