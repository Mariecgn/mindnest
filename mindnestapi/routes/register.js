// routes/utilisateur.js

// importe express pour gérer les routes http
const express = require('express');
const router = express.Router();
// importe la connexion à la base de données mysql
const db = require('../db'); // assure-toi que ce chemin est bon

// route post pour créer un nouvel utilisateur (inscription)
router.post('/', (req, res) => {
  // extrait les champs du corps de la requête
  const { nom, prenom, email, motDePasse } = req.body;

  // vérifie que tous les champs nécessaires sont présents
  if (!email || !motDePasse || !prenom || !nom) {
    return res.status(400).json({ error: 'Champs manquants.' });
  }

  // requête d’insertion dans la table utilisateur
  db.query(
    'INSERT INTO utilisateur (nom, prenom, email, motDePasse) VALUES (?, ?, ?, ?)',
    [nom, prenom, email, motDePasse],
    (err, result) => {
      // en cas d’erreur côté base de données
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur serveur.' });
      }

      // renvoie un message de succès si l’utilisateur est bien créé
      res.status(201).json({ success: true });
    }
  );
});

// exporte le routeur pour qu’il soit utilisé dans index.js
module.exports = router;
