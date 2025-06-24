const express = require('express');
const router = express.Router();
const db = require('../db');

// ajout humeur via /api/humeur
router.post('/', (req, res) => {
  // récup champs du body
  const { utilisateur_id, date, niveau, note } = req.body;

  // check si champs obligatoires sont présents
  if (!utilisateur_id || !date || niveau === undefined) {
    return res.status(400).json({ error: 'champs requis manquants.' });
  }

  // insert humeur dans bdd
  const query = 'INSERT INTO humeur (utilisateur_id, date, niveau, note) VALUES (?, ?, ?, ?)';
  db.query(query, [utilisateur_id, date, niveau, note], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    // renvoie msg + id si ok
    res.status(201).json({ message: 'humeur enregistrée !', id: result.insertId });
  });
});

module.exports = router;
