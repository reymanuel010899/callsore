import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import PhoneDialPad from '../pages/teclado';
export const apiKey = 'AIzaSyDLwk7_Qe2iRiv8a-xtE840W8dvVTGWe9c'
const From = () => {

  const [sourceLanguage, setSourceLanguage] = useState('Spanish');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [isSourceModalVisible, setSourceModalVisible] = useState(false);
  const [isTargetModalVisible, setTargetModalVisible] = useState(false);
  const [idioma, setIdiomas] = useState([])


  const languages  = idioma.map((data) => {
    return data.name
  })

  const get_language = async () => {
    try {
      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`
      );
      const data = await response.json();
      console.log(data)
      setIdiomas(data.data.languages)

    } catch (error) {
      console.error('Error al traducir:', error);
      return null;
    }
  };

  useEffect(()=>{
    get_language()
  }, [targetLanguage])

  const translateText = async (text, sourceLang, targetLang) => {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        }),
      }
    );

    const data = await response.json();
    // console.log('Texto traducido:', data.data.translations[0].translatedText);
  };

  const filtrar_origen_name = () => {
    const origen_len = idioma.filter((len) => {
      if (sourceLanguage == len.name) {
        return len.language
      }
    })
    return origen_len

  }
  const filtrar_destino_name = () => {
    const destino_len = idioma.filter((len) => {
      if (targetLanguage == len.name) {
        return len.language
      }
    })
    return destino_len

  }
  //idiomas de origen y de destino
  window.origen_len = filtrar_origen_name() ? filtrar_origen_name() : "es-ES";
  window.destino_len = filtrar_destino_name() ? filtrar_destino_name() : "es-ES";
  
  
  // translateText('Hola', origen ? origen[0].language : "es", destino ? destino[0].language : "en");
  
  const renderLanguageOption = (language, setLanguage, closeModal) => (
    <TouchableOpacity onPress={() => { setLanguage(language); closeModal(false); }}>
      <Text style={styles.languageOption}>{language}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón para seleccionar el idioma origen */}
      <TouchableOpacity style={styles.sourceButton} onPress={() => {setSourceModalVisible(true)}}>
        <Text>{sourceLanguage}</Text>
      </TouchableOpacity>

      {/* Botón para seleccionar el idioma destino */}
      <TouchableOpacity style={styles.targetButton} onPress={() => {setTargetModalVisible(true)}}>
        <Text>{targetLanguage}</Text>
      </TouchableOpacity>

      {/* Modal para seleccionar el idioma origen */}
      <Modal visible={isSourceModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={languages}
            renderItem={({ item }) => renderLanguageOption(item, setSourceLanguage, setSourceModalVisible)}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

      {/* Modal para seleccionar el idioma destino */}
      <Modal visible={isTargetModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={languages}
            renderItem={({ item }) => renderLanguageOption(item, setTargetLanguage, setTargetModalVisible)}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  sourceButton: {
    position: 'absolute',
    padding: 5,
    left: 15,
    backgroundColor: 'white',
    marginTop: "10%",
    borderRadius: 5,
  },
  targetButton: {
    position: 'absolute',
    right: 15,
    padding: 5,
    marginTop: "10%",
    backgroundColor: 'white',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  languageOption: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  phonePad: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default From;
