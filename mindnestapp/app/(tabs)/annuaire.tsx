import { Phone } from 'lucide-react-native';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Contact = {
  nom: string;
  numero: string;
  description: string;
};

const annuaire: Contact[] = [
  {
    nom: 'Samu (urgence vitale)',
    numero: '15',
    description: 'Urgence médicale grave',
  },
  {
    nom: 'Police secours',
    numero: '17',
    description: 'Danger immédiat, agression',
  },
  {
    nom: 'Pompiers',
    numero: '18',
    description: 'Incendie, accident, secours',
  },
  {
    nom: 'Numéro d’urgence européen',
    numero: '112',
    description: 'Appel d’urgence dans toute l’Europe',
  },
  {
    nom: 'SOS Suicide',
    numero: '3114',
    description: 'Écoute 24h/24, 7j/7, gratuite',
  },
  {
    nom: 'Fil Santé Jeunes',
    numero: '0800 235 236',
    description: 'Anonyme, pour les jeunes',
  },
  {
    nom: 'Violences femmes info',
    numero: '3919',
    description: 'Écoute violences sexistes et conjugales',
  },
  {
    nom: 'Écoute psychologique',
    numero: '0800 858 858',
    description: 'Soutien moral par des professionnels',
  },
];

export default function AnnuaireScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📞 Numéros d’urgence</Text>
      {annuaire.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{item.nom}</Text>
          <Text style={styles.desc}>{item.description}</Text>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => Linking.openURL(`tel:${item.numero}`)}
          >
            <Phone size={18} color="#ec6098" />
            <Text style={styles.callText}>{item.numero}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcde3',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ec6098',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  desc: {
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  callText: {
    color: '#ec6098',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
