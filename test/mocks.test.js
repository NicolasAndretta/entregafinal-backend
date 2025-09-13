//src/test/mocks.test.js
import request from 'supertest';
import app from '../src/app.js';

describe('GET /api/mocks/mockingproducts', () => {
  it('debería devolver un array de productos falsos', async () => {
    const response = await request(app).get('/api/mocks/mockingproducts');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(Array.isArray(response.body.payload)).toBe(true);
    expect(response.body.payload.length).toBeGreaterThan(0);

    const product = response.body.payload[0];
    expect(product).toHaveProperty('_id');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('price');
  });

  it('debería devolver la cantidad solicitada', async () => {
    const response = await request(app).get('/api/mocks/mockingproducts?qty=5');

    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(5);
  });
});

