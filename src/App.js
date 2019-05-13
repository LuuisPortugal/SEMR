import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, Alert, Image, TextInput, StyleSheet, StatusBar, ScrollView, ActivityIndicator, Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import _ from 'lodash';
import logo from './assets/logo.png';

export default class Inicio extends Component {
  state = {
    shouldSelectDevice: true,
    codeDevice: "",
    busy: false,
    feeds: {}
  }

  client = axios.create({
    baseURL: 'https://io.adafruit.com/api/v2/SEMR/feeds/',
    headers: {
      'X-AIO-Key': 'aa603d19ed114f1881048837c5ced9c8'
    }
  });

  alert = (title, message) => {
    console.log(title, message);
    Alert.alert(title, typeof message === 'string' ? message : message.error || "unknown error - contact the SE administrator");
  }

  onPressAccessButton = () => {
    let { codeDevice } = this.state;

    Keyboard.dismiss();

    if (!codeDevice) {
      this.alert("Warning", "type a code - you need type a code for load the data");
      return;
    }

    this.setState({ busy: true });
    this
      .client
      .get('device')
      .then(({ data: { last_value } }) => {
        if (last_value.toUpperCase() === codeDevice.toUpperCase()) {
          this.setState({ shouldSelectDevice: false, busy: false });
          this.loadData();
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

  loadData = () => {
    this.setState({ busy: true });
    Promise
      .all(
        [
          this.client.get(`acx/data`),
          this.client.get(`acy/data`),
          this.client.get(`acz/data`),
          this.client.get(`grx/data`),
          this.client.get(`gry/data`),
          this.client.get(`grz/data`),
          this.client.get(`ky38/data`)
        ]
      )
      .then(([acx, acy, acz, grx, gry, grz, ky38]) => {
        this.setState({
          busy: false,
          feeds: {
            acx: acx.data,
            acy: acy.data,
            acz: acz.data,
            grx: grx.data,
            gry: gry.data,
            grz: grz.data,
            ky38: ky38.data
          }
        });
      })
      .catch(error => {
        this.alert("Error", error);
        this.setState({ busy: false });
      });
  }

  renderData = () => console.log(this.state.feeds);

  onPressActionButtonItemRefresh = () => this.loadData();

  onPressActionButtonItemSave = () => alert("onPressActionButtonItemSave = ()!");

  onPressActionButtonItemChangeDevice = () => this.setState({ shouldSelectDevice: true });

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
                <View style={styles.AppSectionAction}>
                  <TouchableOpacity style={styles.AppButtonActionRefresh} onPress={this.onPressActionButtonItemRefresh}>
                    <Icon name="refresh" style={styles.ActionButtonIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.AppButtonActionSave} onPress={this.onPressActionButtonItemSave}>
                    <Icon name="save" style={styles.ActionButtonIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.AppButtonActionChangeDevice} onPress={this.onPressActionButtonItemChangeDevice}>
                    <Icon name="edit" style={styles.ActionButtonIcon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.AppSectionBody}>

                </View>
              </ScrollView>
            </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  View: {
    flex: 1,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  App: {
    padding: 15
  },
  AppSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  AppSectionAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  AppButtonActionRefresh: {
    borderRadius: 100,
    backgroundColor: "#80C0FF",
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    elevation: 10
  },
  AppButtonActionSave: {
    borderRadius: 100,
    backgroundColor: "#D3A2FF",
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    elevation: 10
  },
  AppButtonActionChangeDevice: {
    borderRadius: 100,
    backgroundColor: "#FFCE80",
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    elevation: 10
  },
  AppSectionBody: {

  },
  AppTitle: {
    width: 280,
    fontSize: 22,
    marginLeft: 15,
    textAlign: 'justify',
    fontWeight: '300',
    color: '#FFFFFF'
  },
  ActionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
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