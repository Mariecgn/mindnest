import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  // initialisation de la navigation
  const router = useRouter();
  // états pour les champs email et mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  // fonction appelée au clic sur "se connecter"
  const handleLogin = async () => {
    if (!email || !password) return; // verif que les champs ne sont pas vides
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Veuillez entrer une adresse e-mail valide.');
  return;
}

    try {
      // envoie une requête au backend pour vérifier les identifiants
      const response = await fetch('http://10.2.105.152:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motDePasse: password })
      });

      const data = await response.json();

      if (response.ok) {
        // stocke l'id utilisateur et le prénom de manière sécurisée
        await SecureStore.setItemAsync('userId', String(data.user.id));
        await SecureStore.setItemAsync('prenom', data.user.prenom); 
        // redirige vers la page d’accueil après connexion
        router.replace('/welcome');
      } else {
        alert(data.error || 'Identifiants incorrects');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur de connexion au serveur.');
    }
  };

  // redirige vers la page d’inscription
  const handleRegisterRedirect = () => {
    router.push('/register'); // crée cette page plus tard
  };

  return (
    // fond d’écran personnalisé
    <ImageBackground
      source={require('@/assets/images/ecranlogin.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* conteneur principal semi-transparent */}
      <View style={styles.container}>
        {/* titre de la page */}
        <Text style={styles.title}>Connexion</Text>

        {/* champ pour l’email */}
        <TextInput
          style={styles.input}
          placeholder="Adresse e-mail"
          value={email}
          onChangeText={setEmail}
        />

        {/* champ pour le mot de passe */}
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
      <Text style={styles.eyeToggle}>
        {showPassword ? '🙈 Masquer' : '👁️ Afficher'}
      </Text>
      </TouchableOpacity>


        {/* bouton de connexion */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        {/* lien vers l’inscription si pas encore de compte */}
        <TouchableOpacity onPress={handleRegisterRedirect}>
          <Text style={styles.registerText}>Pas de compte ? Inscrivez-vous</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// styles pour la mise en page de l’écran
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    marginVertical: 10,
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
  registerText: {
    marginTop: 20,
    color: '#ec6098',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  eyeToggle: {
  color: '#ec6098',
  textAlign: 'right',
  marginTop: -8,
  marginBottom: 8,
  marginRight: 5,
},
});
