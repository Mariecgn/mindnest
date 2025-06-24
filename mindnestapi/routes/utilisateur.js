const express = require('express');
const router = express.Router();
const db = require('../db');

// modifier un utilisateur
router.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { prenom, nom, email, telephone } = req.body;

  db.query(
    'UPDATE utilisateur SET prenom = ?, nom = ?, email = ?, telephone = ? WHERE id = ?',
    [prenom, nom, email, telephone, userId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'erreur serveur' });
      }

      res.json({ success: true });
    }
  );
});

// récupérer un utilisateur par id
router.get('/:id', (req, res) => {
  const userId = req.params.id;

  db.query('SELECT * FROM utilisateur WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'utilisateur non trouvé' });
    }

    res.json(results[0]);
  });
});

module.exports = router;
