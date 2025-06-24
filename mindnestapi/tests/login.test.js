const request = require('supertest');
const app = require('../app');
const db = require('../db');
const bcrypt = require('bcrypt');

describe('POST /api/login', () => {
  const email = 'test@example.com';
  const password = 'password123';

  beforeAll(async () => {
  // del si déjà présent
  await db.promise().query('DELETE FROM utilisateur WHERE email = ?', [email]);

  // insere l'utilisateur avec mot de passe hashé
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.promise().query(
    'INSERT INTO utilisateur (nom, prenom, email, motDePasse) VALUES (?, ?, ?, ?)',
    ['Test', 'Login', email, hashedPassword]
  );
});


  afterAll(async () => {
    await db.promise().query('DELETE FROM utilisateur WHERE email = ?', [email]);
    db.end();
  });

  it('devrait se connecter avec des identifiants valides', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email, motDePasse: password });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/connect/i);
  });
});
