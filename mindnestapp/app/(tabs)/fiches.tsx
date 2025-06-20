// importe react et le hook d’état
import React, { useState } from 'react';
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

  // tableau de fiches en dur pour test
  const fiches: Fiche[] = [
    {
      id: 1,
      titre: 'Anxiété',
      contenu:
        "L’anxiété est une réponse normale au stress, mais elle peut devenir problématique lorsqu’elle est intense, fréquente ou prolongée.\n\n📌 Quand cela apparaît ?\n- Avant une situation importante (examens, entretiens...)\n- En cas d'incertitude ou de peur de l’échec\n\n🧘 Que faire ?\n- Respirer profondément\n- Éviter les stimulants (café, écrans...)\n- Parler à quelqu’un, ou consulter si besoin",
      categorie: 'émotion',
      image: 'angoisse',
    },
    {
      id: 2,
      titre: 'Phobie Sociale',
      contenu:
        "La phobie sociale, aussi appelée anxiété sociale, est une peur intense d’être jugé, observé ou rejeté dans des situations sociales ou de performance.\n\n📍 Quand cela se manifeste ?\n- Lorsqu’il faut parler en public ou en groupe\n- Lors d’interactions avec des inconnus\n- En mangeant ou écrivant en présence d’autrui\n\n🧠 Comment ça se ressent ?\n- Crainte de rougir, transpirer, bégayer ou trembler\n- Besoin d’éviter les situations sociales\n- Pensées négatives (“je vais paraître ridicule”, “on va me juger”)\n\n💡 Que faire ?\n- Commencer par affronter de petites situations sociales\n- Respirer profondément pour calmer le corps\n- Se rappeler que tout le monde peut être maladroit, et que c’est OK\n- En parler à un thérapeute, notamment en thérapie cognitivo-comportementale (TCC)",
      categorie: 'phobie',
      image: 'phobie_sociale',
    },
    {
      id: 3,
      titre: 'TDAH',
      contenu:
        "Le TDAH (Trouble Déficit de l’Attention avec ou sans Hyperactivité) est un trouble neurodéveloppemental qui affecte la concentration, l’impulsivité et parfois l’activité motrice.\n\n🧠 Comment ça se manifeste ?\n- Difficultés à rester concentré longtemps\n- Tendance à l’impulsivité (agir sans réfléchir)\n- Hyperactivité (besoin constant de bouger ou parler)\n- Oublis fréquents, désorganisation\n\n💬 Ce que ça peut provoquer\n- Frustration, fatigue mentale, sentiment de dévalorisation\n- Incompréhensions avec les autres (école, famille, travail)\n\n💡 Que faire ?\n- Utiliser des routines et outils visuels pour s’organiser\n- Travailler par petites sessions avec des pauses\n- En parler à un professionnel (diagnostic, accompagnement)\n- Valoriser ses points forts : créativité, énergie, intuition",
      categorie: 'neurodéveloppemental',
      image: 'tdah',
    },
  ];

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
            onPress={() => {
              setSelectedFiche(fiche);
            
              // Appel à l’API pour incrémenter les fiches lues
              fetch('http://192.168.1.18:3000/api/progression/fiche', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 1 }), // ⚠️ à remplacer par l’ID du user connecté
              })
                .then(res => res.json())
                .then(data => {
                  if (data.trophee) {
                    Alert.alert("🎉 Bravo !", "Tu as débloqué un trophée pour avoir lu 2 fiches !");
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
