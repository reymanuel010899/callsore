import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'; // Importar todo en una sola línea
import Home from './src/pages/home'; // Asegúrate de que la ruta sea correcta

export default function App() {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
