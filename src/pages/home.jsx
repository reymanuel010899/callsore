import React, { useState } from 'react';
import PhoneDialPad from './teclado';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import From from '../component/from';
import call from 'react-native-phone-call';

const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePress = (value) => {
    setPhoneNumber((prevNumber) => prevNumber + value);
    };
    const handleDelete = () => {
        setPhoneNumber((prevNumber) => prevNumber.slice(0, -1));
      };

  const handleCall = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Por favor ingresa un número de teléfono.');
      return;
    }

    const args = {
      number: phoneNumber,
      prompt: false, // Cambia a `true` si quieres que el usuario confirme la llamada
    };

    call(args).catch(console.error);
  };

  return (
    <View style={styles.container}>
      <From/>
      <Text style={styles.title}></Text>
      <Text style={styles.title}></Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad" // Esto configura el teclado para mostrar los números
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <PhoneDialPad onPress={handlePress} onDelete={handleDelete}/>
      {/* <Button title="Llamar" onPress={handleCall} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
    
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 60,
    borderColor: '#fff',
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    borderWidth: .5,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});

export default Home;
