# 🌱 MindNest — Application mobile de soutien en santé mentale

> **Sensibiliser**, **informer** et **soutenir** les jeunes autour de la santé mentale.

![React Native](https://img.shields.io/badge/React%20Native-Mobile%20App-blue?logo=react)
![Backend](https://img.shields.io/badge/Node.js-API-green?logo=node.js)
![Database](https://img.shields.io/badge/MySQL-Database-lightblue?logo=mysql)

---

## 🚀 Fonctionnalités principales

### 📘 1. Fiches explicatives

- 🔍 Classées par catégories : émotions, troubles, phobies...
- ✅ Marquage de lecture enregistré pour la progression.
- 💡 Interface responsive et interactive.

<!-- ![Fiches explicatives](../mindnestapp/assets/images/fichesexplicatives.png) -->
<img src="../mindnestapp/assets/images/fichesexplicatives.png" alt="Fiches explicatives" width="250"/>
<img src="../mindnestapp/assets/images/ficheanxiete.png" alt="Fiche Anxiete" width="250"/>

---

### 🧠 2. Quizz interactifs

- 📚 Plus de **10 thèmes** (TDAH, anxiété, TCA...).
- 🧩 Générés dynamiquement via JSON ou base de données.
- 🎯 Compléter un quiz augmente la progression.

<img src="../mindnestapp/assets/images/quizzinteractif.png" alt="Fiche Anxiete" width="250"/>
<img src="../mindnestapp/assets/images/quiz anxiete.png" alt="Fiche Anxiete" width="244"/>

---

### 📈 3. Suivi de progression

- 🔢 Compteurs de fiches lues et de quizz complétés.
- 🏆 Paliers de récompense tous les 5 éléments.
- 🔐 Données stockées via `SecureStore` + API backend.

<img src="../mindnestapp/assets/images/progressionfiche.png" alt="Progression Fiche" width="244"/>
<img src="../mindnestapp/assets/images/profilprogression.png" alt="Profil Fiche" width="244"/>

---

### 🚨 4. Annuaire d’urgence

- 📞 Numéros utiles (SAMU, Urgences Psy, FilSanté Jeunes...).
- ⚡ Accès rapide et direct depuis l'app.

<img src="../mindnestapp/assets/images/annuairedurgence.png" alt="Annuaire d'urgence" width="244"/>

---

### 🔐 5. Authentification

- 🔐 Inscription & Connexion via **email + mot de passe**.
- 📧 Vérification des champs côté frontend.

<img src="../mindnestapp/assets/images/loginauth.png" alt="login" width="244"/>
<img src="../mindnestapp/assets/images/registerauth.png" alt="login" width="244"/>

---

## 🛠️ Technologies utilisées

### 🎨 Frontend

- React Native avec **Expo Router**
- Stockage local : `SecureStore`
- UI personnalisée : fond rose, modales, cartes, images locales


### 🌐 Backend (API Node.js)

- Express.js avec endpoints REST :
  - `POST /api/utilisateur`
  - `POST /api/progression`
  - `POST /api/quizz`
  - `GET /api/fiche`

### 🗄 Base de données (MySQL / MariaDB)

- Tables : `utilisateur`, `fiche`, `humeur`

#### 🧱 Création de la base de donnée

```sql
CREATE DATABASE mental_app;
USE mental_app;

CREATE TABLE utilisateur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  motDePasse VARCHAR(255),
  telephone VARCHAR(20),
  fiches_lues INT DEFAULT 0,
  quizz_termines INT DEFAULT 0
);

CREATE TABLE fiche (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(100),
  contenu TEXT,
  categorie VARCHAR(100),
  image VARCHAR(100)
);
```

---

## 🔐 Exemple d'appel d'API

```js
fetch('http://<IP>:3000/api/utilisateur', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, motDePasse, prenom, nom })
})
```

---

## ▶️ Lancer l'application 

Assurez-vous d’avoir installé les dépendances :

```bash
npm install
npx expo start -c
```
## 🧠 Cas d'utilisation
<img src="../mindnestapp/assets/images//casdutilisation.png" alt="casdutilisation" width="400"/>

---

### Développé avec le ❤️ pour aider les jeunes.
