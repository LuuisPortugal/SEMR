import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, Grid, YAxis, XAxis, BarChart } from 'react-native-svg-charts'

export default class Detail extends Component {
    static navigationOptions = {
        title: "Detalhe",
        headerRight: (
            <View style={{ marginHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => alert('Salvando...')}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: "#3c54b7"
                    }}>
                        Salvar
                    </Text>
                </TouchableOpacity>
            </View>
        ),
    };

    render() {
        const { navigation } = this.props;
        const formattedAddress = navigation.getParam('formattedAddress', 'NO-FORMATTED-ADDRESS');
        const date = navigation.getParam('date', 'NO-DATE');
        const soundSensorValue = navigation.getParam('sound');
        const floorSensorValue = navigation.getParam('floor');

        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
                    <View style={styles.information}>
                        <Text style={styles.TextBold}>Local: </Text>
                        <Text style={styles.Text}>{formattedAddress}</Text>
                        <Text style={styles.TextBold}>Data: </Text>
                        <Text style={styles.Text}>{date}</Text>
                        <Text style={styles.TextBold}>Gráficos: </Text>
                    </View>
                    <View style={styles.graphics}>
                        <Text style={styles.graphicsText}>Sonoro: </Text>
                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <YAxis
                                data={soundSensorValue || [50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0]}
                                contentInset={{
                                    top: 20,
                                    bottom: 20
                                }}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={value => `${value} dB`}
                            />
                            <LineChart
                                style={{ flex: 1, marginLeft: 16 }}
                                data={soundSensorValue || [50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0, 50, 10, 40, 120, 85, 91, 35, 53, 24, 50, 0]}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                                contentInset={{
                                    top: 20,
                                    bottom: 20
                                }}
                            >
                                <Grid />
                            </LineChart>
                        </View>
                        <Text style={styles.graphicsText}>Trepidação: </Text>
                        <View style={{ height: 200, flexDirection: 'row' }}>
                            <YAxis
                                data={floorSensorValue || [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]}
                                contentInset={{
                                    top: 20,
                                    bottom: 20
                                }}
                                svg={{
                                    fill: 'grey',
                                    fontSize: 10,
                                }}
                                numberOfTicks={10}
                                formatLabel={value => value}
                            />
                            <LineChart
                                style={{ flex: 1, marginLeft: 16 }}
                                data={floorSensorValue || [50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80, 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80]}
                                svg={{ stroke: 'rgb(134, 65, 244)' }}
                                contentInset={{
                                    top: 20,
                                    bottom: 20
                                }}
                            >
                                <Grid />
                            </LineChart>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "#3c54b7"
    },

    container: {
        flex: 1,
        padding: 20
    },

    information: {
    },

    graphics: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        elevation: 5,
        borderRadius: 20
    },

    graphicsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#999999",
        marginBottom: -12
    },

    Text: {
        fontSize: 17,
        fontWeight: '300',
        color: "#DDDDDD",
        marginBottom: 10
    },

    TextBold: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#FFFFFF"
    }
});