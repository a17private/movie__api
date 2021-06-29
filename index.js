/*Import express & morgan*/

const express = require('express'),
  morgan = require('morgan');
 
const app = express();

app.use(morgan('common'));


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
   
  
    /* Return json object */

    app.get('/movies', function (req, res) { 
      res.json(top5movies);
    });

       

    /*Return default textual response*/

    app.get('/movies', (req, res) => {
  res.send('List Movies');
});


    /*Return default textual response*/

app.get('/', (req, res) => {
  res.send('Welcome to my FILM list!');
});


    /*Return default textual response*/

app.get('/movies/[TITLE]', (req, res) => {
  res.send('Movie Title');
});

    /*Return default textual response*/

app.get('/movies/[GENRE]', (req, res) => {
  res.send('Movie Genre');
});

    /*Return default textual response*/

app.get('/directors/[DIRECTORS NAME]', (req, res) => {
  res.send('Directors list');
});

    /*Return default textual response*/

app.get('/users', (req, res) => {
  res.send('Register user');
});

    /*Return default textual response*/

app.get('/users/[USERNAME]', (req, res) => {
  res.send('Update info');
});

    /*Return default textual response*/

app.get('/users/[USERNAME]/favorites/[MOVIE]', (req, res) => {
  res.send('Favourite movie');
});

    /*Return default textual response*/

app.get('/users/[USERNAME]/favorites/[MOVIE]', (req, res) => {
  res.send('Remove Movie from Favourites');
});

    /*Return default textual response*/

app.get('/users/[USERNAME]', (req, res) => {
  res.send('Deregister user');
});

  

   /*Express.static*/

app.use( express.static('public'));

app.get('/documentation', (req, res) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});


/*Error middleware function*/

let myLogger = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

app.use(myLogger);


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});