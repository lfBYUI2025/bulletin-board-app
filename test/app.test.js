describe('Bulletin Board App', () => {
  test('index.js exists and is valid', () => {
    const app = require('../index.js');
    expect(app).toBeDefined();
  });

  test('public/index.html exists', () => {
    const fs = require('fs');
    expect(fs.existsSync('public/index.html')).toBe(true);
  });
});