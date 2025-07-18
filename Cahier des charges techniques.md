# 📘 Cahier des Charges Technique – MindNest

---

## 1. 🧾 Introduction

Ce document présente les choix techniques, outils, langages et contraintes associés à la conception de l'application **MindNest**, une plateforme mobile éducative dédiée à la **sensibilisation à la santé mentale**.

---

## 2. 🏗️ Architecture

| Élément        | Description                                              |
|----------------|----------------------------------------------------------|
| **Client**     | Application mobile avec **React Native** via **Expo**    |
| **Serveur**    | API REST avec **Node.js** et **Express**                 |
| **Base de données** | **MySQL** relationnelle, hébergée localement ou à distance |

---

## 3. ⚙️ Technologies Utilisées

### 📱 Frontend (Mobile)
- **React Native**
- **Expo**
- **TypeScript**
- **expo-secure-store** (stockage sécurisé)
- **expo-router** (navigation)

### 🔧 Backend (API)
- **Node.js**
- **Express**
- **bcrypt** (hachage des mots de passe)
- **mysql2** (connexion MySQL)
- **Jest** & **supertest** (tests automatisés)

### 🗄️ Base de Données – MySQL
- **Tables** :
  - `utilisateur`
  - `fiche`
  - `progression`
- **Types de champs** : `INT`, `VARCHAR`, `TEXT`, `DATE`

---

## 4. 🔐 Sécurité

- Hachage des mots de passe avec **bcrypt**
- **Validations** côté client & serveur :
  - 📧 Email valide (`Regex`)
  - 🔑 Mot de passe fort (majuscule, chiffre, symbole…)
- Données sensibles stockées avec **SecureStore**

---

## 5. 🌐 API REST

| Méthode | Route                          | Fonction                                          |
|---------|--------------------------------|---------------------------------------------------|
| `POST`  | `/api/register`                | Création d’un utilisateur                         |
| `POST`  | `/api/login`                   | Connexion                                         |
| `GET`   | `/api/fiches`                  | Récupération des fiches                          |
| `POST`  | `/api/progression`             | Suivi de progression utilisateur (fiches/quizz)  |
| `POST`  | `/api/progression/quizz`       | Suivi de progression spécifique aux quizz        |

---

## 6. 🧪 Tests

- **Types de tests** : unitaires et d’intégration  
- Outils : `jest`, `supertest`  
- Routes testées :
  - `/register`
  - `/login`
  - `/progression`
  - `/fiche`

---

## 7. ⚙️ Contraintes Techniques

- Déploiement **local** en phase de développement
- Port utilisé : `3000` pour l’API
- Requêtes HTTP via `fetch` avec `Content-Type: application/json`
- Interface optimisée pour **mobile uniquement**

---

## 8. 🚀 Évolutions Possibles

- Authentification avec **JWT tokens**
- Ajout d’un **dashboard administrateur**
- **Stockage cloud** pour les fiches
- Notifications push avec `expo-notifications`

---
