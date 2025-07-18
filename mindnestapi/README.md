# 🧠 MindNest API

> 💖 **API officielle de l'application MindNest**  
> Un projet éducatif & psychologique au service des jeunes 🌸

Cette API permet de gérer :
- 👤 les **utilisateurs**
- 📘 les **fiches informatives**
- 📊 la **progression** (fiches lues, quizz terminés)

---

## 🚀 Démarrage rapide

### 🔧 Installation

1. Clone le repo :

   ```bash
   git clone https://github.com/Mariecgn/mindnest.git
   cd mindnestapi
   ```

2. Installe les dépendances :

   ```bash
   npm install
   ```

3. Configure la connexion MySQL dans `db.js` :

   ```js
   const mysql = require('mysql2');
   const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'ton_mdp',
     database: 'mental_app',
   });
   module.exports = db;
   ```

4. Lance le serveur :

   ```bash
   node index.js
   ```
  Installation pour les tests:
  ```bash
  npm install --save-dev jest supertest
  ```

---

## 📂 Structure des routes

### 🔐 Authentification & progression

| Méthode | Endpoint                      | Description                                             |
|--------:|-------------------------------|---------------------------------------------------------|
| `POST`  | `/api/register`               | Crée un nouvel utilisateur                              |
| `POST`  | `/api/login`                  | Authentifie un utilisateur                              |
| `POST`  | `/api/progression/quizz`      | Incrémente les quiz terminés et retourne un palier 🎯    |
| `GET`   | `/api/fiche`                  | Récupère toutes les fiches stockées en base de données |

---

## 📦 Exemples de requêtes

### 📝 Créer un nouvel utilisateur

**POST** `/api/utilisateur/register`

```json
{
  "email": "test@mail.com",
  "motDePasse": "password123",
  "prenom": "Marie",
  "nom": "Crignon"
}
```

**Réponse :**

```json
{
  "message": "Utilisateur créé avec succès"
}
```

---

## ✅ Système de progression

Chaque fois qu’un utilisateur :
- 📖 lit une fiche → `POST /api/progression`
- 🧩 termine un quiz → `POST /api/progression/quizz`

Les routes :
- ➕ Incrémentent la progression en base de données
- 🌟 Déclenchent une **notification d’encouragement** si un palier est atteint (ex : tous les 5)

---

## 🗃️ Exemple de schéma de la table `utilisateur`


```sql
CREATE TABLE utilisateur (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(50),
  prenom VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  motDePasse VARCHAR(255)
);
```
## 🧩 Diagramme UML (de l'application)

<img src="../mindnestapi/assets-api/plantuml.png" alt="plantuml" width=""/>


---

<p style="color:#e91e63; font-weight:bold; font-size:1.1em;">
  💖 Développé avec le ❤️ pour aider les jeunes.
</p>
