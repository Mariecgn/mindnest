// routes/fiche.js

// importe express pour gérer les routes
const express = require('express');
const router = express.Router();
// importe la connexion à la base de données
const db = require('../db'); // adapter si nécessaire

// route get pour récupérer toutes les fiches disponibles
router.get('/', (req, res) => {
  // exécute une requête pour récupérer toutes les lignes de la table fiche
  db.query('SELECT * FROM fiche', (err, results) => {
    // en cas d’erreur avec la base, renvoie une erreur serveur
    if (err) {
      console.error('Erreur BDD :', err);
      return res.status(500).json({ error: 'Erreur lors de la récupération des fiches.' });
    }

    // renvoie les résultats au client sous forme de json
    res.json(results);
  });
});

// exporte le routeur pour pouvoir l’utiliser dans l’api
module.exports = router;
