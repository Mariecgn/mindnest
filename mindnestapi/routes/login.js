const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
  const { email, motDePasse } = req.body;

  // check champs obligatoire
  if (!email || !motDePasse) {
    return res.status(400).json({ error: 'champs manquants' });
  }

  // récup user via email
  db.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Utilisateur introuvable' });
    }

    const utilisateur = results[0];

    // compare mdp avec hash
    const match = await bcrypt.compare(motDePasse, utilisateur.motDePasse);

    if (!match) {
      return res.status(401).json({ error: 'mdp incorrect' });
    }

    // si tout est ok, renvoie info user
    res.json({ success: true, message: 'connecté !', user: results[0] });
  });
});

module.exports = router;
