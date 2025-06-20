// routes/login.js ou dans utilisateur.js

// importe express pour gérer les routes
const express = require('express');
const router = express.Router();
// importe la connexion mysql
const db = require('../db');

// route post pour se connecter (authentification)
router.post('/', (req, res) => {
  // récupère l’email et le mot de passe du corps de la requête
  const { email, motDePasse } = req.body;

  // vérifie que tous les champs sont fournis
  if (!email || !motDePasse) {
    return res.status(400).json({ error: 'Champs manquants' });
  }

  // exécute une requête pour chercher un utilisateur correspondant
  db.query(
    'SELECT * FROM utilisateur WHERE email = ? AND motDePasse = ?',
    [email, motDePasse],
    (err, results) => {
      // gestion d’erreur de requête
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erreur serveur' });
      }

      // si aucun utilisateur trouvé, retourne une erreur 401 (non autorisé)
      if (results.length === 0) {
        return res.status(401).json({ error: 'Identifiants invalides' });
      }

      // si un utilisateur est trouvé, retourne ses infos
      res.json({ success: true, user: results[0] });
    }
  );
});

// exporte le routeur pour l’utiliser dans l’app principale
module.exports = router;
