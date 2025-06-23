const express = require('express');
const router = express.Router();
const db = require('../db'); // ou le chemin vers ta connexion MySQL

// 📚 Récupérer toutes les fiches
router.get('/', (req, res) => {
  db.query('SELECT * FROM fiche', (err, results) => {
    if (err) {
      console.error('Erreur récupération fiches :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

module.exports = router;
