import Slider from '@react-native-community/slider';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// liste des emojis et humeurs associées
const emojis = ['😄', '😕', '🤔', '😐', '😞', '😡', '😴'];
const moods = [
  'Heureux(se)',
  'Anxieux(se)',
  'Pensif(ve)',
  'Neutre',
  'Triste',
  'En colère',
  'Fatigué(e)',
];

// composant principal de l’écran de bienvenue
export default function WelcomeScreen() {
  // initialise la navigation
  const router = useRouter();
  // index du slider (lié aux emojis et moods)
  const [index, setIndex] = useState(0);
  // prénom récupéré depuis securestore
  const [prenom, setPrenom] = useState('');

  // récupère le prénom stocké au lancement du composant
  useEffect(() => {
    const fetechPrenom = async () => {
      const storedPrenom = await SecureStore.getItemAsync('prenom');
      if(storedPrenom) {
        setPrenom(storedPrenom);
      }
    };
    fetechPrenom();
  }, []);

  // envoie l’humeur sélectionnée vers l’écran d’accueil
  const handleNext = () => {
    const emoji = emojis[index];
    const mood = moods[index];
    router.replace({
      pathname: '/accueil',
      params: { emoji, mood },
    });
  };

  return (
    <View style={styles.container}>
      {/* message d’accueil personnalisé */}
      <Text style={styles.title}>Bonjour {prenom},</Text>
      <Text style={styles.subtitle}>Nous sommes heureux de te revoir !</Text>

      {/* question posée à l’utilisateur */}
      <Text style={styles.question}>Comment te sens-tu aujourd’hui ?</Text>

      {/* ligne d’emojis pour illustrer l’état émotionnel */}
      <View style={styles.emojiRow}>
        {emojis.map((e, i) => (
          <Text key={i} style={[styles.emoji, index === i && styles.selectedEmoji]}>
            {e}
          </Text>
        ))}
      </View>

      {/* slider pour sélectionner l’émotion */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={emojis.length - 1}
        step={1}
        value={index}
        onValueChange={(val) => setIndex(val)}
        minimumTrackTintColor="#ec6098"
        maximumTrackTintColor="#ddd"
        thumbTintColor="#ec6098"
      />

      {/* bouton pour valider le choix et continuer */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
}

// styles de l’écran de bienvenue
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffcde3',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#fff',
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 26,
    opacity: 0.4,
  },
  selectedEmoji: {
    opacity: 1,
  },
  slider: {
    width: '100%',
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#ec6098',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
