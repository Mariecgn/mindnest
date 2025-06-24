const express = require('express');
const router = express.Router();
const db = require('../db');

// incrémente le nombre de fiches lues pour un utilisateur
router.post('/', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'l’identifiant utilisateur est requis.' });
  }

  // met à jour le compteur fiches_lues
  db.query(
    'UPDATE utilisateur SET fiches_lues = fiches_lues + 1 WHERE id = ?',
    [userId],
    (err1) => {
      if (err1) {
        console.error('erreur update :', err1);
        return res.status(500).json({ error: 'erreur progression fiche (update)' });
      }

      // récupère le nouveau total
      db.query(
        'SELECT fiches_lues FROM utilisateur WHERE id = ?',
        [userId],
        (err2, results) => {
          if (err2) {
            console.error('erreur select :', err2);
            return res.status(500).json({ error: 'erreur progression fiche (select)' });
          }

          const fichesLues = results[0].fiches_lues;

          // retourne la valeur au frontend
          res.json({ fichesLues });
        }
      );
    }
  );
});

// incrémente le nombre de quizz terminés pour un utilisateur
router.post('/quizz', (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'l’identifiant utilisateur est requis.' });
  }

  // met à jour le compteur quizz_termines
  db.query(
    'UPDATE utilisateur SET quizz_termines = quizz_termines + 1 WHERE id = ?',
    [userId],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'erreur mise à jour quiz' });
      }

      // récupère le nouveau total
      db.query(
        'SELECT quizz_termines FROM utilisateur WHERE id = ?',
        [userId],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'erreur récupération quiz' });
          }

          const quizzTermines = results[0]?.quizz_termines || 0;
          res.json({ quizzTermines });
        }
      );
    }
  );
});

module.exports = router;
