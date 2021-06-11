/*import express & morgan*/

const express = require('express'),
  morgan = require('morgan');
 
const app = express();

app.use(morgan('common'));



/*Morgan Middleware*/










/*Error middleware function*/

let myLogger = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

app.use(myLogger);






/*expose the endpoint*/

app.get('/movies', function (req, res) {
    res.send('')
  })




  /* Return json object */
  
  app.get('/', function (req, res) {
    res.send('')
  })

  app.use( express.static('public'));





  /*JSON object about Top 5 MOVIES*/

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