// importe la navigation via expo-router
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
// importe les composants react native nécessaires
import * as SecureStore from 'expo-secure-store';
import { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// composant de l’écran de profil
export default function ProfilScreen() {
  // récupère la fonction de navigation
  const router = useRouter();
  const [prenom, setPrenom] = useState('');
  const [fichesLues, setFichesLues] = useState(0);
  const [quizzTermines, setQuizzTermines] = useState(0);
  const [scoreHumeur, setScoreHumeur] = useState(0);

  
   useFocusEffect(
    useCallback(() => {
    const fetchStats = async () => {
      const userId = await SecureStore.getItemAsync('userId');
      if (!userId) return;

      try {
        const res = await fetch(`http://10.173.148.14:3000/api/utilisateur/${userId}`);
        const data = await res.json();

        setScoreHumeur(data.score_humeur || 0);
        setFichesLues(data.fiches_lues || 0);
        setQuizzTermines(data.quizz_termines || 0);
        setPrenom(data.prenom || 'Utilisateur');
      } catch (err) {
        console.error("Erreur chargement profil :", err);
      }
    };

    fetchStats();
  }, [])
);

const handleLogout = async () => {
  await SecureStore.deleteItemAsync('userId');
  await SecureStore.deleteItemAsync('prenom');
  // ajoute d'autres clés si besoin

  router.replace('/login');
}

  return (
    // scrollview contenant l’ensemble de la page
    <ScrollView contentContainerStyle={styles.container}>
      {/* image de profil */}
      <Image
        source={require('../../assets/images/avatarvide.jpg')}
        style={styles.avatar}
      />

      {/* nom affiché */}
      <Text style={styles.name}>{prenom}</Text>

      {/* bouton pour accéder à l’écran de modification */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/modifier')}
      >
        <Text style={styles.buttonText}>Modifier le profil</Text>
      </TouchableOpacity>

      {/* boîte d’affichage des statistiques */}
      <View style={styles.statsBox}>
        {/* <Text style={styles.statItem}>Score d’humeur <Text style={styles.bold}>{scoreHumeur}</Text></Text> */}
      <View style={styles.divider} />
      <Text style={styles.statItem}>Fiches lues <Text style={styles.bold}>{fichesLues}</Text></Text>
    <View style={styles.divider} />
    <Text style={styles.statItem}>Quizz terminés <Text style={styles.bold}>{quizzTermines}</Text></Text>
  </View>
<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Text style={styles.logoutText}>Se déconnecter</Text>
</TouchableOpacity>

    </ScrollView>
    
  );
}

// styles utilisés pour l’écran
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcde3',
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  statsBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginTop: 20,
  },
  statItem: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  logoutButton: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 30,
  marginTop: 30,
  alignItems: 'center',
},
logoutText: {
  color: '#ec6098',
  fontWeight: 'bold',
  fontSize: 16,
},

});
