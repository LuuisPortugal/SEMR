import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

export default class Relatorio extends Component {
    onPressButtonRelatorio = () => 
        this.props.navigation.navigate('RelatorioDetail', this.props.data);

    render() {
        let { place, date } = this.props.data.information;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onPressButtonRelatorio}>
                <Text style={styles.place}>{place || 'NO_PLACE'}</Text>
                <Text style={styles.date}>{date || 'NO_DATE'}</Text>
            </TouchableOpacity>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30
    },

    place:{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5
    },

    date: {
        fontSize: 16,
        fontWeight: '400',
        color: 'gray'
    }
});