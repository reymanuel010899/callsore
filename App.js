import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-get-random-values';
import { PermissionsAndroid } from 'react-native';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'; // Importar todo en una sola línea
import Home from './src/pages/home'; // Asegúrate de que la ruta sea correcta
import RNCallKeep from 'react-native-callkeep';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions'
import From , {  apiKey } from './src/component/from';
import PhoneDialPad from './src/pages/teclado';

export default function App() {
  const requestPermissions = async () => {

  // const phonePermission = await check('android.permission.CALL_PHONE');
  // console.log(phonePermission)
    try {
      const granted = await PermissionsAndroid.requestMultiple([
          'android.permission.READ_PHONE_STATE',
          'android.permission.CALL_PHONE',
          'android.permission.MANAGE_OWN_CALLS',
          'android.permission.READ_CALL_LOG',
          'android.permission.ANSWER_PHONE_CALLS',
          'android.permission.PROCESS_OUTGOING_CALLS',
          'android.permission.BIND_TELECOM_CONNECTION_SERVICE'
      ]);
  
      const allGranted = Object.values(granted).every((status) => status === PermissionsAndroid.RESULTS.GRANTED);
  
      if (!allGranted) {
        console.error('Some permissions were not granted');
      }
    } catch (err) {
      console.warn(err);
    }
  };
    // useEffect(() => {
    requestPermissions()
      // // CallKeep options
      const options = {
        ios: {
          appName: 'callstore',
        },
        android: {
          alertTitle: 'Permissions required',
          alertDescription: 'This application needs to access your phone accounts',
          cancelButton: 'Cancel',
          okButton: 'OK',
          additionalPermissions: [
          'android.permission.READ_PHONE_STATE',
          'android.permission.CALL_PHONE',
          'android.permission.MANAGE_OWN_CALLS',
          'android.permission.READ_CALL_LOG',
          'android.permission.ANSWER_PHONE_CALLS',
          'android.permission.PROCESS_OUTGOING_CALLS'
        ],
          foregroundService: {
            channelId: 'com.callstore.app',
            channelName: 'callstore',
            notificationTitle: 'My app is running on background',
            notificationIcon: 'Path to the resource icon of the notification',
          }, 
        },
      };
      // console.log(options)
    // // Initialize CallKeep
    // handleMakeCall()
    RNCallKeep.setup(options).then(accepted => {console.log("bien")}).catch((err)=>{console.log("error"), console.log(err)});
    // RNCallKeep.setAvailable(true);
    RNCallKeep.checkIsInManagedCall().then((AC) => {console.log("yes")}).catch((er)=>{console.log(er)})
    // RNCallKeep.checkIsInManagedCall().then((AC) => {console.log("yes")}).catch((er)=>{console.log("err")})
 
    // // Optionally, request permissions
    RNCallKeep.hasPhoneAccount().then((hasAccount) => {
      console.log("entre")
      if (!hasAccount) {
        RNCallKeep.askForPermissionsIfNeeded();
      }
    }).catch((e)=> {console.log("otro error")});
  // }, []);

 

  return (
    <SafeAreaView style={styles.container}>
      <Home />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
