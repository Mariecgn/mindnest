const request = require('supertest');
const app = require('../app');
const db = require('../db');

describe('API Utilisateur', () => {
  const uniqueEmail = `user${Date.now()}@example.com`;

  afterAll(() => {
    // supprime l'utilisateur ajouté pour éviter les doublons
    db.query('DELETE FROM utilisateur WHERE email = ?', [uniqueEmail]);
    db.end();
  });

  it('devrait créer un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        nom: 'Test',
        prenom: 'User',
        email: uniqueEmail,
        motDePasse: 'password123'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/créé/i);
  });

  it('doit échouer si email est manquant', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        nom: 'Erreur',
        prenom: 'SansEmail',
        motDePasse: 'password123'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
