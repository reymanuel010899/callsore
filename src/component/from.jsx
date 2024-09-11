import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const From = () => {
  const [sourceLanguage, setSourceLanguage] = useState('Idioma origen');
  const [targetLanguage, setTargetLanguage] = useState('Idioma destino');
  const [isSourceModalVisible, setSourceModalVisible] = useState(false);
  const [isTargetModalVisible, setTargetModalVisible] = useState(false);

  const languages = ['Inglés', 'Español', 'Francés', 'Alemán'];
  useEffect(() => {
    // Función para obtener los idiomas de la API de Google

    const fetchLanguages = async () => {
        try {
          const response = await fetch(`http://146.190.163.126:8001/api/method/callstore.www.callstoreapi.get_lenguage`);
          const data = await response.json();
          console.log(data); // Verifica el contenido de la respuesta
        //   const languageList = data.data.languages.map((lang) => lang.language);
        //   setSourceLanguage(languageList);
        } catch (error) {
          console.error('Error al obtener los idiomas:', error);
        }
      };
      

    fetchLanguages();
  }, []);

  const renderLanguageOption = (language, setLanguage, closeModal) => (
    <TouchableOpacity onPress={() => { setLanguage(language); closeModal(false); }}>
      <Text style={styles.languageOption}>{language}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Botón para seleccionar el idioma origen */}
      <TouchableOpacity style={styles.sourceButton} onPress={() => setSourceModalVisible(true)}>
        <Text>{sourceLanguage}</Text>
      </TouchableOpacity>

      {/* Botón para seleccionar el idioma destino */}
      <TouchableOpacity style={styles.targetButton} onPress={() => setTargetModalVisible(true)}>
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

      {/* Teclado de marcado de teléfono (placeholder) */}
      <View style={styles.phonePad}>
        {/* Aquí iría el componente del teclado numérico */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
 
  sourceButton: {
    position: 'absolute',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  targetButton: {
    position: 'absolute',
    right: 5,
    padding: 5,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default From;
