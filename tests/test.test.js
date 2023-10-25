import request from "supertest";
import app from "../src/app.js";


describe('GET /api/breeds', () => {
  test('check standart response', async () => {
    const response = await request(app)
      .get('/api/breeds')

    console.log(response.req);
    expect(response.status).toBe(200);
  })
})

