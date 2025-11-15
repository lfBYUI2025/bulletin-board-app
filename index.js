const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 8080;
http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
      if (err) { res.writeHead(500); return res.end('Error'); }
      res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(data);
    });
  } else { res.writeHead(404); res.end('Not found'); }
}).listen(PORT, '0.0.0.0', () => console.log('App on ' + PORT));
