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

    app.get('/', (req, res) => {
  res.send('Welcome to my FILM list!');
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