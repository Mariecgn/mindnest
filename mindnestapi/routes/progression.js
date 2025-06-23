const express = require('express');
const router = express.Router();
const db = require('../db');

// ➕ Incrément fiche lue
router.post('/fiche', async (req, res) => {
  const { userId } = req.body;

  try {
    // 1. Incrémenter
    await db.query('UPDATE utilisateur SET fiches_lues = fiches_lues + 1 WHERE id = ?', [userId]);

    // 2. Vérifier s’il a atteint un palier de trophée
    const [result] = await db.query('SELECT fiches_lues FROM utilisateur WHERE id = ?', [userId]);
    const fichesLues = result[0].fiches_lues;

    if (fichesLues === 2) {
      await db.query('INSERT INTO trophee (utilisateur_id, type, palier) VALUES (?, "fiche", 2)', [userId]);
      return res.json({ trophee: true });
    }

    res.json({ trophee: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur progression fiche' });
  }
});

// ➕ Incrément quizz terminé
router.post('/quizz', async (req, res) => {
  const { userId } = req.body;

  try {
    await db.query('UPDATE utilisateur SET quizz_termines = quizz_termines + 1 WHERE id = ?', [userId]);

    const [result] = await db.query('SELECT quizz_termines FROM utilisateur WHERE id = ?', [userId]);
    const quizzTermines = result[0].quizz_termines;

    if (quizzTermines === 2) {
      await db.query('INSERT INTO trophee (utilisateur_id, type, palier) VALUES (?, "quizz", 2)', [userId]);
      return res.json({ trophee: true });
    }

    res.json({ trophee: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur progression quizz' });
  }
});

module.exports = router;
