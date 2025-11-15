const request = require('supertest');
const http = require('http');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

describe('Bulletin Board Server', () => {
  let app;

  beforeAll(() => {
    const server = require('../index.js');
    app = http.createServer(server);
    app.listen(0);
  });

  afterAll((done) => {
    app.close(done);
  });

  test('GET / returns index.html', async () => {
    fs.readFile.mockImplementation((p, cb) => cb(null, '<h1>Bulletin Board</h1>'));
    path.join.mockReturnValue('/mock/index.html');
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Bulletin Board');
  });

  test('GET /unknown returns 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });
});
