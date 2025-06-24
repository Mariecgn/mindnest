const request = require('supertest');
const app = require('../app');

describe('GET /api/fiche', () => {
  it('devrait retourner toutes les fiches avec un tableau JSON', async () => {
    const response = await request(app).get('/api/fiche');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // verif qu'au moins une fiche a les champs requis
    if (response.body.length > 0) {
      const fiche = response.body[0];
      expect(fiche).toHaveProperty('id');
      expect(fiche).toHaveProperty('titre');
      expect(fiche).toHaveProperty('contenu');
      expect(fiche).toHaveProperty('categorie');
      expect(fiche).toHaveProperty('image');
    }
  });
});
