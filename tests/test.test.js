import request from "supertest";
import app from "../src/app.js";

afterAll((done) => {
    app.close(() => {
      console.log('Test server closed');
      done();
    });
  });

test('123', async () => {
    const response = await request(app)
        .get('/api/breeds')

    expect(response.status).toBe(200)
})