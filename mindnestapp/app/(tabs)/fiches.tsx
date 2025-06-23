// importe react et le hook d’état
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
// importe les composants nécessaires de react native
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// définition du type fiche
type Fiche = {
  id: number;
  titre: string;
  contenu: string;
  categorie: string;
  image: string;
};

// récupère une image locale en fonction du nom fourni
const getImage = (name: string) => {
  switch (name) {
    case 'angoisse':
      return require('../../assets/images/angoisse.png');
    case 'phobie_sociale':
      return require('../../assets/images/phobie_sociale.png');
    case 'tdah':
      return require('../../assets/images/tdah.png');
  }

  return null;
};

// détermine une couleur de carte selon le titre
const getCardColor = (titre: string) => {
  switch(titre.toLowerCase()) {
    case 'tdah':
      return '#ffe0ed';
    case 'phobie sociale':
      return '#d4eaf7';
    default:
      return "#fff";
  }
};

// composant principal de l’écran des fiches
export default function FichesScreen() {
  // états pour la fiche sélectionnée et le champ de recherche
  const [selectedFiche, setSelectedFiche] = useState<Fiche | null>(null);
  const [search, setSearch] = useState('');
  const [fiches, setFiches] = useState<Fiche[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
  fetch('http://10.173.148.14:3000/api/fiche')
    .then(res => res.json())
    .then(data => {
      setFiches(data);
      setLoading(false);
    })
    .catch(err => {
      console.error('Erreur fetch fiches :', err);
      setLoading(false);
    });
}, []);

  // filtre les fiches en fonction de la recherche
  const filtered = fiches.filter((fiche) =>
    fiche.titre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      {/* champ de recherche */}
      <TextInput
        placeholder="🔍 Rechercher"
        value={search}
        onChangeText={setSearch}
        style={styles.searchBar}
      />

      {/* grille de fiches */}
      <View style={styles.grid}>
        {filtered.map((fiche) => (
          <TouchableOpacity
            key={fiche.id}
            style={[
              styles.card,
              { backgroundColor: getCardColor(fiche.titre) },
            ]}
            onPress={async () => {
        setSelectedFiche(fiche);

  const userId = await SecureStore.getItemAsync('userId');
  if (!userId) return;

  fetch('http://10.173.148.14:3000/api/progression', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Fiches lues :", data.fichesLues);
      if (data.fichesLues % 5 === 0) {
        Alert.alert("🎉 Bien joué !", `Tu as lu ${data.fichesLues} fiches ! Continue comme ça.`);
      }
    })
    .catch(err => console.error("Erreur progression fiche :", err));
}}



          >
            <Image
              source={getImage(fiche.image)}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>{fiche.titre}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* modale d’affichage de la fiche sélectionnée */}
      <Modal visible={!!selectedFiche} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {/* bouton pour fermer la modale */}
            <TouchableOpacity onPress={() => setSelectedFiche(null)} style={styles.closeButton}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>✕</Text>
            </TouchableOpacity>

            {/* contenu de la fiche sélectionnée */}
            {selectedFiche && (
              <>
                <Text style={styles.modalTitle}>{selectedFiche.titre}</Text>
                <Text style={styles.modalText}>{selectedFiche.contenu}</Text>
                {getImage(selectedFiche.image) && (
                  <Image
                    source={getImage(selectedFiche.image)!}
                    style={styles.modalImage}
                    resizeMode="contain"
                  />
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// styles de l’interface
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffcde3',
    flex: 1,
    padding: 16,
  },
  modalImage: {
    width: '100%',
    height: 120,
    marginTop: 20,
    alignSelf: 'center',
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 16,
    alignItems: 'center',
    padding: 10,
    marginBottom: 12,
  },
  cardImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 10,
    color: '#ec6098',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
});
