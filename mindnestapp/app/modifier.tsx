// importe la navigation depuis expo-router
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
// importe le hook d’état
import { useState } from 'react';
// importe les composants react native nécessaires
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

// composant principal pour modifier les informations du profil
export default function ModifierProfilScreen() {
  // initialise la navigation
  const router = useRouter();

  // états pour chaque champ du profil
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');

  // fonction appelée à la sauvegarde du formulaire
  const handleSave = async () => {
  try {
    const userId = await SecureStore.getItemAsync('userId');
    if (!userId) {
      Alert.alert('Erreur', 'Utilisateur non connecté');
      return;
    }

    const response = await fetch(`http://192.168.1.18:3000/api/utilisateur/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prenom,
        nom,
        email,
        telephone: tel
      }),
    });

    if (response.ok) {
      Alert.alert('✅ Profil mis à jour');
      await SecureStore.setItemAsync('prenom', prenom); // on met à jour le prénom local
      router.back();
    } else {
      const data = await response.json();
      Alert.alert('Erreur', data.error || 'Erreur lors de la mise à jour');
    }
  } catch (err) {
    console.error(err);
    Alert.alert('Erreur', 'Impossible de modifier le profil');
  }
};


  return (
    // conteneur principal avec défilement vertical
    <ScrollView contentContainerStyle={styles.container}>
      {/* titre de la page */}
      <Text style={styles.title}>Modifier le profil</Text>

      {/* champ pour le prénom */}
      <TextInput
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        style={styles.input}
      />

      {/* champ pour le nom */}
      <TextInput
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
        style={styles.input}
      />

      {/* champ pour l’email */}
      <TextInput
        placeholder="Adresse email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      {/* champ pour le téléphone */}
      <TextInput
        placeholder="Numéro de téléphone"
        value={tel}
        onChangeText={setTel}
        keyboardType="phone-pad"
        style={styles.input}
      />

      {/* bouton de sauvegarde */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// styles pour la mise en page du formulaire
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcde3',
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#ec6098',
  },
  input: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  saveText: {
    color: '#ec6098',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
