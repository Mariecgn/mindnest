// importe express pour gérer les routes http
const express = require('express');
const router = express.Router();
// importe la connexion à la base de données mysql
const db = require('../db'); // assure-toi que ce chemin est bon
const bcrypt = require('bcrypt');

// route post pour créer un nouvel utilisateur (inscription)
router.post('/', async (req, res) => {
  // extrait les champs du corps de la requête
  const { nom, prenom, email, motDePasse } = req.body;

  // vérifie que tous les champs nécessaires sont présents
  if (!email || !motDePasse || !prenom || !nom) {
    return res.status(400).json({ error: 'Champs manquants.' });
  }
//hachage mdp bcrypt
try {
    const hash = await bcrypt.hash(motDePasse, 10);
    db.query(
      'INSERT INTO utilisateur (nom, prenom, email, motDePasse) VALUES (?, ?, ?, ?)',
      [nom, prenom, email, hash],
      (err) => {
        if (err) {
          console.error('❌ Erreur enregistrement :', err);
          return res.status(500).json({ error: 'Erreur serveur' });
        }

        res.status(200).json({ message: 'Utilisateur créé' });
        console.log('👤 Données envoyées :', { nom, prenom, email, hash });

      }
      
    );
  } catch (err) {
    console.error('❌ Erreur bcrypt :', err);
    res.status(500).json({ error: 'Erreur lors du hash' });
  }
});

// exporte le routeur pour qu’il soit utilisé dans index.js
module.exports = router;
