import { StyleSheet, Text, View } from 'react-native';

export default function GlossaireScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>📚 Bienvenue dans le Glossaire (réflexion)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
