const express = require('express');
const app = express();

app.get('/movies', function (req, res) {
    res.send('')
  })

  app.get('/', function (req, res) {
    res.send('')
  })

  app.use( express.static('public'));

  app.use((err, req, res, next) => {
    // logic
  });
