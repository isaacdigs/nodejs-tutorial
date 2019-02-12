const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({success: true});
});

app.get('/data', (req,res) => {
  res.json({ data: 'Here is my data!'});
});

const data = [
  { name: 'cow', pattern: 'patches' },
  { name: 'cheetah', pattern: 'spots' },
  { name: 'leopard', pattern: 'spots' },
  { name: 'zebra', pattern: 'stripes' }
];

app.get('/animals', (req, res) => {
  if (req.query.pattern) {
    const filteredData = data.filter(animal => {
      return animal.pattern === req.query.pattern
    });

    return res.json({animals: filteredData});
  }
  res.json({ animals: data });
});

app.use((req, res, next) => {
  req.myProperty = 'Say Hello from middleware';
  next();
});

app.post('/animals', (req, res) => {
  res.json({success:req.myProperty});
});

const server = http.createServer(app);

server.listen(3000);

console.log('Listening at http://localhost:3000');
