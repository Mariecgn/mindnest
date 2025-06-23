// index.js

// importe express pour créer le serveur http
const express = require('express');
// importe cors pour autoriser les requêtes cross-origin
const cors = require('cors');
// importe body-parser pour parser le corps des requêtes json
const bodyParser = require('body-parser');

// importe les différents groupes de routes
const humeurRoutes = require('./routes/humeur');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const ficheRoutes = require('./routes/fiche');
const progressionRoutes = require('./routes/progression');
const utilisateurRoutes = require('./routes/utilisateur');

// crée l’application express
const app = express();
// définit le port d’écoute du serveur
const PORT = 3000;

// active cors pour permettre l’accès depuis d’autres origines (mobile, web...)
app.use(cors());

// parse les requêtes entrantes en json
app.use(bodyParser.json());

// utilise les routes importées sous les préfixes définis
app.use('/api/humeur', humeurRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/fiches', ficheRoutes);
app.use('/api/progression', progressionRoutes);
app.use('/api/utilisateur', utilisateurRoutes);

// démarre le serveur et écoute sur le port défini
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
