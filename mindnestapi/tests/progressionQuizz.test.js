const request = require('supertest');
const app = require('../app');
const db = require('../db');    

let testUserId;

beforeAll(done => {
  // crée un utilisateur temporaire pour les tests
  db.query(
    `INSERT INTO utilisateur (nom, prenom, email, motDePasse) VALUES (?, ?, ?, ?)`,
    ['Test', 'Quiz', 'testquiz@example.com', 'password123'],
    (err, result) => {
      if (err) return done(err);
      testUserId = result.insertId;
      done();
    }
  );
});

afterAll(done => {
  // nettoyage des données test
  db.query(`DELETE FROM progression WHERE utilisateurId = ?`, [testUserId], () => {
    db.query(`DELETE FROM utilisateur WHERE id = ?`, [testUserId], () => {
      db.end();
      done();
    });
  });
});

describe('POST /api/progression/quizz', () => {
  it('incrémente les quiz terminés pour un utilisateur valide', async () => {
    const res = await request(app)
      .post('/api/progression/quizz')
      .send({ userId: testUserId })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('quizzTermines');
    expect(typeof res.body.quizzTermines).toBe('number');
  });

  it('retourne une erreur si userId est manquant', async () => {
    const res = await request(app)
      .post('/api/progression/quizz')
      .send({})
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
