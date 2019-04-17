import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';

export default class ColetarDados extends Component 
{
    static navigationOptions = 
    {
        title: 'Coletar Dados'
    }

    state = {
        connected: false,
        device: null,
        saving: false
    }

    onBluetoothConnect = (device = null) => 
    {
        this.setState({ connected: true, device });
    }

    onBluetoothLostOrDisabledOrDisconnected = (reconnect = true, device = null) => 
    {
        this.setState({ connected: false, saving: false, device });
        if(reconnect){
            this.reconnectBluetooth();
        }
    }

    reconnectBluetooth = () => 
    {
        setTimeout(() => 
            this.connectBluetooth(), 2000);
    }

    connectBluetooth = async () => 
    {
        let devices = await BluetoothSerial.list();
        for(let key in devices)
        {
            let device = devices[key];
            if(device.name === "HC-05")
            {
                await BluetoothSerial
                    .connect(device.id)
                    .then(() => this.onBluetoothConnect(device) && this.reconnectBluetooth())
                    .catch(() => this.reconnectBluetooth());
            }
        }
    }

    onPressButtonBegin = () => {
        this.setState({ saving: true });
    }

    render() {
        const { connected, device, saving } = this.state;

        if(connected)
        {
            return (
                <View style={styles.container}>
                    <Text style={styles.btnDisconnectTextBold}>
                        ID: <Text style={styles.btnDisconnectText}>{ device.id }</Text>
                    </Text>
                    <Text style={styles.btnDisconnectTextBold}>
                        Dispositivo: <Text style={styles.btnDisconnectText}>{ device.name }</Text>
                    </Text>
                    <TouchableOpacity style={saving ? styles.btnBeginDisabled : styles.btnBegin} onPress={this.onPressButtonBegin} disabled={saving}>
                        <Text style={styles.btnBeginText}>
                            { saving ? 'Salvando Dados...' : 'Iniciar' }
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.btnDisconnectTextBold}>Bluetooth desconectado</Text>
                <Text>Tentando se conectar...</Text>
            </View>
        );
    }   
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnBegin: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: "#EFEFEF",
        marginTop: 40,
        borderRadius: 5,
        elevation: 3
    },

    btnBeginDisabled: {
        paddingHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: "#EAEAEA",
        marginTop: 40,
        borderRadius: 5,
        elevation: 1
    },

    btnBeginText: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    btnDisconnectText: {
        fontSize: 17,
        fontWeight: '300'
    },

    btnDisconnectTextBold: {
        fontSize: 16,
        fontWeight: 'bold'
    }
});