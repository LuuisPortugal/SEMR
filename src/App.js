import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Image, TextInput, StyleSheet, StatusBar } from 'react-native';

import logo from './assets/logo.png';

export default class Inicio extends Component {
  state = {
    shouldSelectDevice: true,
    codeDevice: ""
  }

  onPressAccessButton = () => {
    this.setState({ shouldSelectDevice: false });
  }

  onChangeTextCodeDevice = codeDevice => {
    this.setState({ codeDevice });
  }

  render() {
    let { shouldSelectDevice } = this.state;

    return (
      <View style={styles.View}>
        <Modal
          animationType="slide"
          visible={shouldSelectDevice}>
          <View style={styles.View}>
            <View style={styles.ModalSectionHeader}>
              <Image source={logo} />
              <Text style={styles.ModalTitle}>Sistema Embarcado de Medição de Ruidos</Text>
            </View>
            <View style={styles.ModalSectionForm}>
              <TextInput
                placeholder="Digite o Código do Dispositivo"
                placeholderTextColor="#FFFFFF"
                autoCapitalize="characters"
                style={styles.ModalInputText}
                onChangeText={this.onChangeTextCodeDevice}
              />
              <TouchableOpacity
                style={styles.ModalTouchableOpacity}
                onPress={this.onPressAccessButton}>
                <Text style={styles.ModalTouchableOpacityText}>Acessar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>


        <StatusBar
          barStyle="light-content"
          backgroundColor="#0080FF"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#0080FF'
  },
  ModalSectionHeader: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalSectionForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ModalTitle: {
    width: 300,
    fontSize: 22,
    marginTop: 20,
    textAlign: 'center',
    fontWeight: '400',
    color: '#FFFFFF'
  },
  ModalInputText: {
    height: 30,
    width: 250,
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 1,
    paddingHorizontal: 5
  },
  ModalTouchableOpacity: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 250,
    marginTop: 10,
    borderRadius: 2
  },
  ModalTouchableOpacityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  }
});