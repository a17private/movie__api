/*import express*/

const express = require('express');
const app = express();

/*expose the endpoint*/

app.get('/movies', function (req, res) {
    res.send('')
  })

/* Return json object */
  
  app.get('/', function (req, res) {
    res.send('')
  })

  app.use( express.static('public'));

  app.use((err, req, res, next) => {
    // logic
  });

let top5movies = [
  {
    Movie: 'ESCAPE ROOM',
    Director: 'Adam Robitel'
  },
  {
    Movie: 'INCEPTION',
    Director: 'Christopher Nolan'
  },
  {
    Movie: 'PAID IN FULL',
    Director: 'Charles Stone III'
  },
  {
    Movie: 'LIFE',
    Director: 'Ted Demme'
  },
  {
    Movie: 'COMING TO AMERICA',
    Director: 'John Landis'
  },
  ];

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my FILM list!');
});

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res) => {
  res.json(top5movies);
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});