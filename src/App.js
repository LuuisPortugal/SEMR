import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, Image, TextInput, StyleSheet, StatusBar, ScrollView, ActivityIndicator } from 'react-native';

import ActionButton from 'react-native-action-button';
import axios from 'axios';
import logo from './assets/logo.png';

export default class Inicio extends Component {
  state = {
    shouldSelectDevice: false,
    codeDevice: "",
    busy: false
  }

  client = () => axios.create({
    baseURL: 'https://io.adafruit.com/api/v2/SEMR/feeds/',
    headers: {
      'X-AIO-Key': 'aa603d19ed114f1881048837c5ced9c8'
    }
  });

  alert = (title, message) => {
    console.log(title, message);
    Alert.alert(title, typeof message === 'string' ? message : message.error || "unknown error - contact the SE administrator");
  }

  loadData = () => {
    this.setState({ busy: true });
    setTimeout(() => this.setState({ busy: false }), 2000);
  }

  onPressAccessButton = () => {
    let { codeDevice } = this.state;
    if (!codeDevice) {
      this.alert("Warning", "type a code - you need type a code for load the data");
      return;
    }

    this.setState({ busy: true });
    this
      .client()
      .get('device')
      .then(({ data: { last_value } }) => {
        if (last_value.toUpperCase() === codeDevice.toUpperCase()) {
          this.setState({ shouldSelectDevice: false, busy: false });
          //this.loadData();
        } else {
          throw { error: "not found - contact the SE operator" };
        }
      })
      .catch(error => {
        this.alert("Error", error);
        this.setState({ shouldSelectDevice: true, busy: false });
      });
  }

  onChangeTextCodeDevice = codeDevice => {
    this.setState({ codeDevice });
  }

  render() {
    let { shouldSelectDevice, busy } = this.state;

    return (
      <View style={styles.View}>
        <Modal
          animationType="slide"
          visible={shouldSelectDevice}>
          <View style={styles.View}>
            <View style={styles.ModalSectionHeader}>
              <Image source={logo} />
              <Text style={styles.ModalTitle}>SEMR - Sistema Embarcado de Medição de Ruidos</Text>
            </View>
            <View style={styles.ModalSectionForm}>
              <TextInput
                placeholder="Digite o Código do Dispositivo"
                placeholderTextColor="#FFFFFF"
                autoCapitalize="characters"
                style={styles.ModalInputText}
                onChangeText={this.onChangeTextCodeDevice}
              />
              {
                busy ?
                  <ActivityIndicator size="small" color="#FFFFFF" style={{ marginTop: 10 }} /> :
                  <TouchableOpacity
                    style={styles.ModalTouchableOpacity}
                    onPress={this.onPressAccessButton}>
                    <Text style={styles.ModalTouchableOpacityText}>Acessar</Text>
                  </TouchableOpacity>
              }
            </View>
          </View>
        </Modal>


        <StatusBar
          barStyle="light-content"
          backgroundColor="#0080FF"
        />

        {
          busy ?
            <View style={styles.View}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View> :
            <View style={styles.View}>
              <ScrollView style={styles.App}>
                <View style={styles.AppSectionHeader}>
                  <Image source={logo} />
                  <Text style={styles.AppTitle}>SEMR - Sistema Embarcado de Medição de Ruidos</Text>
                </View>
              </ScrollView>
              <ActionButton
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { console.log("hi") }}
              />
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#0080FF'
  },
  App: {
    padding: 15
  },
  AppSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  AppTitle: {
    width: 280,
    fontSize: 22,
    marginLeft: 15,
    textAlign: 'justify',
    fontWeight: '300',
    color: '#FFFFFF'
  },
  ModalSectionHeader: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ModalSectionForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    width: 198,
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