import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const PhoneDialPad = ({ onPress, onDelete, handlecall}) => {

  const renderButton = (value, letters = '') => (
    <TouchableOpacity onPress={() => onPress(value)} style={styles.button}>
      <Text style={styles.number}>{value}</Text>
      {letters !== '' && <Text style={styles.letters}>{letters}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {renderButton('1')}
        {renderButton('2')}
        {renderButton('3')}
      </View>
      <View style={styles.row}>
        {renderButton('4')}
        {renderButton('5')}
        {renderButton('6')}
      </View>
      <View style={styles.row}>
        {renderButton('7')}
        {renderButton('8')}
        {renderButton('9')}
      </View>
      <View style={styles.row}>
        {renderButton('*')}
        {renderButton('0', '+')}
        {renderButton('#')}
      </View>

      {/* Nueva fila para los botones de eliminar y llamar */}
      <View style={styles.actionRow}>
      <TouchableOpacity onPress={handlecall} style={styles.callButton}>
          <Ionicons name="call-outline" size={64} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <AntDesign name="closecircleo" size={38} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "13%",
    // button: 10,
    // top: "20%",
    // marginTop: 800,
  },
  row: {
    backgroundColor: 'black',
    flexDirection: 'row',
    top: 50,
    marginBottom: 10,
  },
  button: {
    width: 90,
    height: 70,
    borderRadius: 40,
    backgroundColor: '#e6e6e6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  number: {
    fontSize: 32,
    color: '#000',
  },
  letters: {
    fontSize: 12,
    color: '#666',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 100,
    justifyContent: 'space-between',
    width: '50%', // Ajusta el ancho de la fila para los botones de eliminar y llamar
  },
  callButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
  },
  deleteButton: {
    width: 100,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    // marginTop: 10
  },
});

export default PhoneDialPad;
