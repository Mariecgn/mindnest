import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {
  // initialise la navigation
  const router = useRouter();

  // états pour stocker les valeurs des champs
  const [email, setEmail] = useState('');
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // fonction pour valider le format de l’email
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // fonction déclenchée à la tentative de création de compte
  const handleRegister = async () => {
    // Validation du mot de passe
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Le mot de passe doit contenir :\n• 1 majuscule\n• 1 chiffre\n• 1 caractère spécial\n• minimum 8 caractères');
  return;
  }

    // vérifie si tous les champs sont remplis
    if (!email || !password || !prenom || !nom) {
      Alert.alert('Erreur', 'Tous les champs sont obligatoires.');
      return;
      
    }

    // vérifie si l’email est valide
    if (!isValidEmail(email)) {
      Alert.alert('Erreur', 'Adresse email invalide.');
      return;
    }

    // vérifie si les mots de passe correspondent
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }

    // tentative d’envoi au backend
    try {
      const res = await fetch('http://10.173.148.14:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse: password, prenom, nom }),
      });
    
      const data = await res.json();

      if (res.ok) {
        // si tout est ok, message de succès et redirection
        Alert.alert('Succès', 'Compte créé avec succès 🎉', [
          { text: 'OK', onPress: () => router.replace('/login') },
        ]);
      } else {
        // sinon, affiche le message d’erreur
        Alert.alert('Erreur', data.error || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Impossible de se connecter au serveur.');
    }
  };

  return (
    // image de fond personnalisée
    <ImageBackground
      source={require('@/assets/images/ecranlogin.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* conteneur central semi-transparent */}
      <View style={styles.container}>
        <Text style={styles.title}>Inscription</Text>

        {/* champs de saisie du formulaire */}
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={prenom}
          onChangeText={setPrenom}
        />
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={nom}
          onChangeText={setNom}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmez le mot de passe"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text style={styles.eyeToggle}>
            {showConfirmPassword ? '🙈 Masquer' : '👁️ Afficher'}
          </Text>
        </TouchableOpacity>

        {/* bouton pour valider l’inscription */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>

        {/* lien pour retourner à la page de connexion */}
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Déjà un compte ? Connectez-vous</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// styles utilisés pour la mise en page de l’écran
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    margin: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ec6098',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#ec6098',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    color: '#ec6098',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  eyeToggle: {
    color: '#ec6098',
    textAlign: 'right',
    marginTop: -5,
    marginBottom: 8,
    marginRight: 5,
  },
});
