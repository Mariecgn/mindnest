// importe la navigation depuis expo-router
import { useRouter } from 'expo-router';
// importe les composants nécessaires depuis react native
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// composant principal de l’écran d’accueil
export default function HomeScreen() {
  // initialise la navigation
  const router = useRouter();

  return (
    // image de fond pleine page
    <ImageBackground
      source={require('@/assets/images/fond1ecran.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* conteneur principal centré verticalement */}
      <View style={styles.container}>
        {/* bloc de texte avec titre et sous-titre */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            Bienvenue sur <Text style={{ color: '#ec4899' }}>MindNest</Text>
          </Text>
          <Text style={styles.subtitle}>
            Une application éducative pour comprendre ta santé mentale.
          </Text>
        </View>

        {/* bloc contenant le bouton de navigation */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

// styles utilisés pour la mise en page
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  textWrapper: {
    marginTop: 40,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    paddingHorizontal: 20,
    fontFamily: 'Baloo2-Regular',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ec4899',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  onText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
