const request = require('supertest');
const app = require('../app');
const db = require('../db');   

let testUserId;

beforeAll(done => {
  // cree un utilisateur fictif
  db.query(
    `INSERT INTO utilisateur (nom, prenom, email, motDePasse) VALUES (?, ?, ?, ?)`,
    ['Test', 'Fiche', 'testfiche@example.com', 'password123'],
    (err, result) => {
      if (err) return done(err);
      testUserId = result.insertId;
      done();
    }
  );
});

afterAll(done => {
  // suppr les données de test
  db.query(`DELETE FROM progression WHERE utilisateurId = ?`, [testUserId], () => {
    db.query(`DELETE FROM utilisateur WHERE id = ?`, [testUserId], () => {
      db.end();
      done();
    });
  });
});

describe('POST /api/progression (fiches)', () => {
  it('incrémente les fiches lues pour un utilisateur valide', async () => {
    const res = await request(app)
      .post('/api/progression')
      .send({ userId: testUserId })
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('fichesLues');
    expect(typeof res.body.fichesLues).toBe('number');
  });

  it('retourne une erreur si userId est manquant', async () => {
    const res = await request(app)
      .post('/api/progression')
      .send({})
      .set('Content-Type', 'application/json');

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
