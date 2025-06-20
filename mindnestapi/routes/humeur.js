// importe express pour définir les routes
const express = require('express');
const router = express.Router();
// importe la connexion à la base de données
const db = require('../db');

// route post pour enregistrer une humeur
// accessible via /api/humeur
router.post('/', (req, res) => {
  // extrait les champs nécessaires du corps de la requête
  const { utilisateur_id, date, niveau, note } = req.body;

  // vérifie que les champs obligatoires sont bien présents
  if (!utilisateur_id || !date || niveau === undefined) {
    return res.status(400).json({ error: 'Champs requis manquants.' });
  }

  // requête sql pour insérer une nouvelle ligne dans la table humeur
  const query = 'INSERT INTO humeur (utilisateur_id, date, niveau, note) VALUES (?, ?, ?, ?)';
  db.query(query, [utilisateur_id, date, niveau, note], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    // si l’insertion est un succès, renvoie un message et l’id inséré
    res.status(201).json({ message: 'Humeur enregistrée !', id: result.insertId });
  });
});

// exporte le routeur pour l’utiliser dans index.js
module.exports = router;
