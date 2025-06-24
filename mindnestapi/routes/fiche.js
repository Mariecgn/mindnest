const express = require('express');
const router = express.Router();
const db = require('../db'); 

// récup ttes les fiches dispo
router.get('/', (req, res) => {
  db.query('SELECT * FROM fiche', (err, results) => {
    if (err) {
      // log si pb qd on récup des fiches
      console.error('erreur récup fiches :', err);
      return res.status(500).json({ error: 'erreur serveur' });
    }
    // renvoie les fiches au client
    res.json(results);
  });
});

module.exports = router;