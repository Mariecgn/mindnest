// importe les paramètres d’url et la navigation
import { useLocalSearchParams, useRouter } from 'expo-router';
// importe le hook pour gérer les états
import { useState } from 'react';
// importe les composants natifs nécessaires
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// importe le composant calendrier
import { Calendar } from 'react-native-calendars';
// importe le composant graphique en ligne
import { LineChart } from 'react-native-chart-kit';

// fonction pour obtenir les 7 derniers jours avec leur date et une étiquette
function getLast7Days(): { date: string; label: string }[] {
  const days = [];
  const today = new Date();
  const labels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().split('T')[0];
    const dayLabel = labels[d.getDay()];
    days.push({ date: iso, label: dayLabel });
  }
  return days;
}

// composant principal de l’écran d’accueil
export default function AccueilScreen() {
  // états pour gérer les modales, champs et données
  const [modalVisible, setModalVisible] = useState(false);
  const [graphVisible, setGraphVisible] = useState(false);
  const [daysSober, setDaysSober] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [reasonRelapse, setReasonRelapse] = useState('');
  const router = useRouter();
  const { mood, emoji, reason } = useLocalSearchParams();
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [moods, setMoods] = useState<{ [key: string]: string }>({});

  const last7 = getLast7Days();
const recentEmojis = last7.map(({ date }) => moods[date]).filter(Boolean);

const getMoodMessage = () => {
  if (recentEmojis.length === 0) return "Comment te sens-tu ces derniers jours ?";

  const moodCounts = recentEmojis.reduce((acc, emoji) => {
    acc[emoji] = (acc[emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];

  switch (mostCommon) {
    case '😢':
    case '😡':
    case '😴':
      return "Tu as l’air bas ces derniers jours. On est là ❤️";
    case '😄':
      return "Tu sembles aller bien en ce moment. Continue ainsi ✨";
    case '😐':
      return "Tu avances à ton rythme. Prends soin de toi 💛";
    default:
      return "Merci de partager comment tu te sens 💬";
  }
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* titre de l’écran */}
      <Text style={styles.title}>Voici ton bilan...</Text>

      {/* carte d’humeur actuelle */}
      <View style={styles.bilanCard}>
        <Text style={styles.feelingLabel}>Tu te sens..</Text>
        <Text style={styles.feeling}>
          {mood ? `Tu te sens ${mood}` : '😔 Triste'}
        </Text>
        {/* affichage de la raison si disponible */}
        {reason && (
          <Text style={{ fontStyle: 'italic', color: '#555', textAlign: 'center', marginTop: 4 }}>
            “{reason}”
          </Text>
        )}
        {/* bouton pour mettre à jour l’humeur */}
        <TouchableOpacity style={styles.updateButton} onPress={() => router.push('/humeur')}>
          <Text style={styles.updateText}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>

      {/* affichage du calendrier de suivi hebdomadaire */}
      <View style={styles.calendar}>
        <Text style={styles.subTitle}>Calendrier de suivi</Text>
        <View style={styles.weekRow}>
          {/* affichage des emojis par jour */}
          {getLast7Days().map(({ date, label }, i) => (
            <View key={i} style={styles.dayBox}>
              <Text style={styles.dayLetter}>{label}</Text>
              <Text style={styles.emoji}>{moods[date] || '😊'}</Text>
            </View>
          ))}
        </View>
        {/* bouton pour afficher plus de jours */}
        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
          <Text style={styles.more}>Voir plus...</Text>
        </TouchableOpacity>
      </View>

      {/* affichage du calendrier complet si activé */}
      {showCalendar && (
        <View>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={Object.fromEntries(
              Object.entries(moods).map(([date, emoji]) => [
                date,
                {
                  customStyles: {
                    container: { backgroundColor: '#ffe4ee' },
                    text: { text: emoji, fontSize: 18 },
                  },
                },
              ])
            )}
            markingType="custom"
            theme={{
              backgroundColor: '#ffcde3',
              calendarBackground: '#ffcde3',
            }}
          />
          {/* affichage des choix d’humeur pour une date sélectionnée */}
          {selectedDate !== '' && (
            <View style={styles.emojiSelector}>
              <Text style={styles.emojiSelectorTitle}>
                Sélectionne ton humeur pour {selectedDate} :
              </Text>
              <View style={styles.emojiRow}>
                {/* sélection parmi une liste d’emojis */}
                {['😄', '😐', '😢', '😡', '😴'].map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    onPress={() => {
                      setMoods((prev) => ({ ...prev, [selectedDate]: emoji }));
                      setSelectedDate('');
                    }}
                  >
                    <Text style={styles.emojiChoice}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </View>
      )}

      {/* section du suivi de sobriété */}
      <View style={{ marginTop: 20 }}>
        <Text style={styles.subTitle}>Suivi de sobriété</Text>

        {/* encart avec message de disponibilité */}
        <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 10 }}>
          <Text style={{ textAlign: 'center' }}>Graphique sobriété disponible</Text>
        </View>

        {/* bouton pour afficher le graphique */}
        <TouchableOpacity onPress={() => setGraphVisible(true)}>
          <Text style={{ color: '#ec6098', fontWeight: 'bold', textAlign: 'center' }}>
            Voir le graphique
          </Text>
        </TouchableOpacity>

        {/* bouton pour ouvrir la modale de mise à jour */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 10 }}>
          <Text style={{ color: '#ec6098', fontWeight: 'bold', textAlign: 'center' }}>Mettre à jour</Text>
        </TouchableOpacity>
      </View>

      {/* message d’encouragement */}
      <View style={styles.messageBox}>
        <Text style={styles.messageTitle}>{getMoodMessage()}</Text>
      </View>


      {/* modale de mise à jour sobriété */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
          <View style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 16,
            width: '85%',
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Mise à jour sobriété
            </Text>

            {/* champ de saisie pour les jours */}
            <TextInput
              placeholder="Depuis combien de jours ?"
              keyboardType="numeric"
              value={daysSober}
              onChangeText={setDaysSober}
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 10,
                paddingVertical: 6,
              }}
            />

            {/* champ pour le type de substance */}
            <TextInput
              placeholder="Substance concernée (alcool, cannabis...)"
              value={selectedType}
              onChangeText={setSelectedType}
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 10,
                paddingVertical: 6,
              }}
            />

            {/* champ optionnel pour la rechute */}
            <TextInput
              placeholder="Motif d’une éventuelle rechute (optionnel)"
              value={reasonRelapse}
              onChangeText={setReasonRelapse}
              multiline
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                marginBottom: 20,
                paddingVertical: 6,
              }}
            />

            {/* boutons d’action pour la modale */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#ec6098', fontWeight: 'bold' }}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                console.log("Sobriété :", {
                  daysSober,
                  selectedType,
                  reasonRelapse
                });
                setModalVisible(false);
              }}>
                <Text style={{ color: '#ec6098', fontWeight: 'bold' }}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* modale pour afficher le graphique de sobriété */}
      <Modal visible={graphVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            color: '#ec6098'
          }}>
            Ton graphique de sobriété
          </Text>

          {/* graphique en ligne affichant les données */}
          <LineChart
            data={{
              labels: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7'],
              datasets: [{
                data: [4, 3, 5, 2, 6, parseInt(daysSober) || 1, 3],
              }],
            }}
            width={Dimensions.get('window').width - 40}
            height={300}
            yAxisSuffix="j"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff0f5',
              backgroundGradientTo: '#ffcde3',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(236, 96, 152, ${opacity})`,
              labelColor: () => '#444',
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#ec6098',
              },
            }}
            style={{ borderRadius: 16 }}
          />

          {/* bouton pour fermer la vue graphique */}
          <TouchableOpacity onPress={() => setGraphVisible(false)} style={{ marginTop: 30 }}>
            <Text style={{
              textAlign: 'center',
              color: '#ec6098',
              fontWeight: 'bold',
              fontSize: 16
            }}>
              Fermer
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    padding: 57,
    backgroundColor: '#ffcde3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ec6098',
    marginBottom: 20,
  },
  bilanCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  feelingLabel: {
    fontSize: 16,
    color: '#333',
  },
  feeling: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  updateButton: {
    backgroundColor: '#ec6098',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
  updateText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  calendar: {
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayBox: {
    alignItems: 'center',
  },
  dayLetter: {
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 20,
  },
  more: {
    textAlign: 'right',
    color: '#777',
    marginTop: 5,
    fontStyle: 'italic',
  },
  emojiSelector: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
  },
  emojiSelectorTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  emojiChoice: {
    fontSize: 30,
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginTop: 20,
  },
  messageTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  messageDesc: {
    color: '#555',
    fontSize: 14,
  },
});
