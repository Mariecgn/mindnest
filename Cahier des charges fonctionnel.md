# 📝 Cahier des Charges Fonctionnel – MindNest

---

## 1. 🎯 Contexte et Objectifs

MindNest est une application mobile éducative visant à sensibiliser les jeunes aux troubles mentaux (TDAH, anxiété, dépression, etc.).  
L’utilisateur peut apprendre via des **fiches pédagogiques** et tester ses connaissances à l’aide de **quizz interactifs**.

> 🎓 Objectif : Favoriser la **compréhension**, **l’autonomie** et la **bienveillance** autour de la santé mentale.

---

## 2. 👥 Public Cible

- **Adolescents et jeunes adultes**
- **Professionnels** de l’éducation ou de la santé souhaitant vulgariser ces sujets
- Toute personne intéressée par la santé mentale

---

## 3. 🛠️ Fonctionnalités principales

### 🔐 Authentification
- Inscription avec **nom**, **prénom**, **email**, **mot de passe sécurisé**
- Connexion avec vérification du mot de passe chiffré (`bcrypt`)
- Données stockées de façon sécurisée dans une base MySQL

### 📚 Accès aux fiches
- Liste de fiches par thématique *(TDAH, phobie sociale, dépression, etc.)*
- Affichage des contenus : **définitions**, **symptômes**, **solutions**
- Incrémentation automatique des fiches lues (pour suivi)

### 🧠 Quizz
- Format **QCM** (questions à choix multiples)
- Résultat affiché en fin de test
- Suivi du nombre de quizz terminés

### 📈 Progression
- Affichage du nombre de fiches lues et de quizz réalisés
- Tableau de bord personnel de progression

---

## 4. 💻 Contraintes Techniques

| Élément       | Choix                     |
|---------------|---------------------------|
| **Frontend**  | React Native (via Expo)   |
| **Backend**   | Node.js + Express         |
| **Base de données** | MySQL              |
| **Tests**     | Jest (API)                |
| **Sécurité**  | bcrypt + expo-secure-store |

---

## 5. 🎨 Design & Accessibilité

- Univers **bienveillant**, avec des **tons roses doux**
- **Typographie lisible**, interface simple et claire
- Application **responsive** pour toutes tailles d’écran
- Accessible à un public jeune et non-expert

---

## 6. 🚀 Évolutions Possibles

- Création de **quizz personnalisés**
- Ajout d’un **système de badges** ou **tableau de classement**
- **Partage** de progression ou contenus avec des amis

---
