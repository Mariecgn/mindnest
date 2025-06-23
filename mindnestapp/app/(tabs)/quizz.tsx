// importe la navigation depuis expo-router
import { Link, useRouter } from 'expo-router';

// importe les composants react native nécessaires
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';

// tableau des thèmes de quiz avec leur titre et route associée
const themes = [
   { title: 'TCA (troubles du comportement alimentaire)', route: 'tca' },
  { title: 'Anxiété', route: 'anxiete' },
  { title: 'TDAH (troubles de l’attention)', route: 'tdah' },
  { title: 'Dépression', route: 'depression' },
  { title: 'Phobie sociale', route: 'phobie_sociale' },
  { title: 'Estime de soi', route: 'estime_de_soi' },
  { title: 'Stress', route: 'stress' },
  { title: 'Harcèlement scolaire', route: 'harcelement' },
  { title: 'Addictions (écrans, substances, etc.)', route: 'addictions' },
  { title: 'Troubles du sommeil', route: 'sommeil' },
  { title: 'Confiance en soi', route: 'confiance' },
  { title: 'Émotions (gestion et expression)', route: 'emotions' },
  { title: 'Burn-out scolaire', route: 'burnout' },
  { title: 'Relations amicales et sociales', route: 'relations' },
  { title: 'Perfectionnisme', route: 'perfectionnisme' },
  { title: 'Motivation et décrochage', route: 'motivation' }
];

// composant principal de l’écran de quiz
export default function QuizzScreen() {
  // récupère la fonction de navigation
  const router = useRouter();

  return(
    // scrollview qui contient l’ensemble de l’écran
    <ScrollView contentContainerStyle={styles.container}>
      {/* titre principal */}
      <Text style={styles.title}>Quizz</Text>

      {/* sous-titre d’instruction */}
      <Text style={styles.subtitle}>Sélectionner un thème pour commencer</Text>

      {/* liste des boutons générés à partir des thèmes */}
      {themes.map((theme, index) => (
  <Link
    key={index}
    href={`/quizz/${theme.route}` as any}
    asChild
  >
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{theme.title}</Text>
    </TouchableOpacity>
  </Link>
))}
    </ScrollView>
  );
}

// styles de l’interface utilisateur
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcde3',
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    elevation: 2,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
