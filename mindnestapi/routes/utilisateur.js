// routes/utilisateur.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 📝 Modifier un utilisateur
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { prenom, nom, email, telephone } = req.body;

  db.query(
    'UPDATE utilisateur SET prenom = ?, nom = ?, email = ?, telephone = ? WHERE id = ?',
    [prenom, nom, email, telephone, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }

      res.json({ success: true });
    }
  );
});
// 🔍 Récupérer un utilisateur par ID
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  db.query('SELECT * FROM utilisateur WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json(results[0]);
  });
});

module.exports = router;
