const mysql = require('mysql2');

// crée une connexion avec les paramètres de ta base
const db = mysql.createConnection({
  host: 'localhost',       
  user: 'mindnest',        
  password: 'mon_super_mdp', 
  database: 'mental_app',  
  charset: 'utf8mb4',
});

// tente de se connecter à mysql et affiche un message si c’est réussi
db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL');
});

// exporte la connexion pour pouvoir l’utiliser ailleurs (routes, modèles...)
module.exports = db;
