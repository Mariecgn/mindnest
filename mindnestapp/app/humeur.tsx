import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// composant principal pour l’écran de sélection d’humeur
export default function HumeurScreen() {
  // initialise la navigation
  const router = useRouter();
  // état pour l’humeur sélectionnée
  const [selectedMood, setSelectedMood] = useState('');
  // état pour la raison éventuelle
  const [reason, setReason] = useState('');

  // dictionnaire associant une humeur à un emoji
  const emojiMap: { [key: string]: string } = {
    'Triste': '😢',
    'Colère': '😡',
    'Heureux(se)': '😄',
    'Joyeux(se)': '😊',
  };

  // fonction appelée à la validation
  const handleSubmit = () => {
    if (!selectedMood) return; // sécurité : éviter validation sans sélection
    const emoji = emojiMap[selectedMood] || '';
    router.replace({
      pathname: '/accueil',
      params: {
        mood: selectedMood,
        emoji,
        reason,
      },
    });
  };

  // tableau des humeurs proposées
  const moods = [
    { label: 'Triste', emoji: '😢' },
    { label: 'Colère', emoji: '😡' },
    { label: 'Heureux(se)', emoji: '😄' },
    { label: 'Joyeux(se)', emoji: '😊' },
  ];

  return (
    <View style={styles.container}>
      {/* titre de l’écran */}
      <Text style={styles.title}>Comment te sens-tu ?</Text>

      {/* boutons d’humeurs */}
      <View style={styles.moodOptions}>
        {moods.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.moodButton,
              selectedMood === item.label && styles.moodButtonSelected,
            ]}
            onPress={() => setSelectedMood(item.label)}
          >
            <Text style={styles.moodText}>
              {item.emoji} {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* champ texte pour expliquer la raison */}
      <TextInput
        placeholder="Pourquoi ?"
        multiline
        numberOfLines={4}
        value={reason}
        onChangeText={setReason}
        style={styles.input}
      />

      {/* bouton de validation, désactivé si aucune humeur choisie */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          !selectedMood && { opacity: 0.5 },
        ]}
        onPress={handleSubmit}
        disabled={!selectedMood}
      >
        <Text style={styles.submitText}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}

// styles utilisés pour les composants de l’écran
const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#ffcde3', flex: 1 },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ec6098',
  },
  moodOptions: { marginBottom: 20 },
  moodButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  moodButtonSelected: {
    backgroundColor: '#ec6098',
  },
  moodText: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#ec6098',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
