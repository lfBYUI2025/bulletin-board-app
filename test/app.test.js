const request = require('supertest');
const fs = require('fs');
const path = require('path');

jest.mock('fs');
jest.mock('path');

const app = require('../index.js');

describe('Bulletin Board Server', () => {
  test('GET / returns index.html', async () => {
    fs.readFile.mockImplementation((p, cb) => cb(null, '<h1>Bulletin Board</h1>'));
    path.join.mockReturnValue('/mock/index.html');
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Bulletin Board');
  }, 10000);

  test('GET /unknown returns 404', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  }, 10000);
});
