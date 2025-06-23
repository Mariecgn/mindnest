const express = require('express');
const router = express.Router();
const db = require('../db');

// ➕ Incrément fiche lue
router.post('/', (req, res) => {
  const { userId } = req.body;

  // 1. Incrémenter les fiches lues
  db.query(
    'UPDATE utilisateur SET fiches_lues = fiches_lues + 1 WHERE id = ?',
    [userId],
    (err1) => {
      if (err1) {
        console.error('❌ Erreur update :', err1);
        return res.status(500).json({ error: 'Erreur progression fiche (update)' });
      }

      // 2. Lire le nouveau total
      db.query(
        'SELECT fiches_lues FROM utilisateur WHERE id = ?',
        [userId],
        (err2, results) => {
          if (err2) {
            console.error('❌ Erreur select :', err2);
            return res.status(500).json({ error: 'Erreur progression fiche (select)' });
          }

          const fichesLues = results[0].fiches_lues;
          console.log("✅ Fiches lues :", fichesLues);

          // 3. Retourne la valeur au frontend
          res.json({ fichesLues });
        }
      );
    }
  );
});

router.post('/quizz', (req, res) => {
  const { userId } = req.body;

  db.query(
    'UPDATE utilisateur SET quizz_termines = quizz_termines + 1 WHERE id = ?',
    [userId],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur mise à jour quiz' });
      }

      db.query(
        'SELECT quizz_termines FROM utilisateur WHERE id = ?',
        [userId],
        (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erreur récupération quiz' });
          }

          const quizzTermines = results[0]?.quizz_termines || 0;
          res.json({ quizzTermines });
        }
      );
    }
  );
});


module.exports = router;
