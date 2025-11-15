const request = require('supertest');
const http = require('http');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

describe('Bulletin Board Server', () => {
  let app, server;

  beforeAll((done) => {
    const handler = require('../index.js');
    server = http.createServer(handler);
    server.listen(0, () => {
      app = request(server);
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  test('GET / returns index.html', async () => {
    fs.readFile.mockImplementation((p, cb) => cb(null, '<h1>Bulletin Board</h1>'));
    path.join.mockReturnValue('/mock/index.html');
    const res = await app.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Bulletin Board');
  }, 10000);

  test('GET /unknown returns 404', async () => {
    const res = await app.get('/unknown');
    expect(res.status).toBe(404);
  }, 10000);
});
