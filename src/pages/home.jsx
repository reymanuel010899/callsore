import React, { useState } from 'react';
import { Platform } from 'react-native';
import RNCallKeep from 'react-native-callkeep';
import { v4 as uuidv4 } from 'uuid';
import PhoneDialPad from './teclado';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import From , {  apiKey } from '../component/from';
// import call from 'react-native-phone-call';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  //Una vez que tengas el audio de la llamada, lo envías al servicio de Speech-to-Text.
  const recognizeAudio = async (audioContent) => {
    const request = {
      audio: {
        content: audioContent, // Audio en formato base64
      },
      config: {
        encoding: 'LINEAR16', // Cambiar según el formato de tu audio
        sampleRateHertz: 16000,
        languageCode: 'es-ES', // Cambiar por el idioma seleccionado
      },
    };
  
    try {
      const response = await fetch(
        `https://speech.googleapis.com/v1/speech:recognize?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        }
      );
  
      const data = await response.json();
      if (data.results) {
        return data.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
      }
      return 'No transcription found';
    } catch (error) {
      console.error('Error with Speech-to-Text API:', error);
      return 'Error transcribing audio';
    }
  };
  const handlePress = (value) => {
    setPhoneNumber((prevNumber) => prevNumber + value);
    };
    const handleDelete = () => {
        setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
      };

  const handleCall = () => {
    const newUUID = uuidv4();
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      console.log(phoneNumber)
      RNCallKeep.startCall(newUUID,  phoneNumber);
    } else {
      console.log(origen_len)
      console.log('RNCallKeep no es compatible con la plataforma web');
    }
    
  };

  return (
    <View style={styles.container}>
      <From/>
      <TextInput
        style={styles.input}
        // keyboardType="phone-pad" // Esto configura el teclado para mostrar los números
        editable={false}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <PhoneDialPad onPress={handlePress} onDelete={handleDelete} handlecall={handleCall}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // padding: 5,
    
  },
  // title: {
  //   fontSize: 24,
  //   marginBottom: 20,
  //   textAlign: 'center',
  // },
  input: {
    height: 60,
    // marginStart: 10,
    margin: "auto",
    width: '90%',
    // top: "15%",
    // position: 'absolute',
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    borderWidth: .5,
    marginTop: "35%",
    paddingHorizontal: 10,
  }
});

export default Home;
