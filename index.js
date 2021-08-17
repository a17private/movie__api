const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


/*Import express & morgan*/

const express = require('express'),
  morgan = require('morgan');
 
const app = express();

app.use(morgan('common'));


/*JSON object about Top 5 MOVIES*/
/*
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

    */
   
  
    /* Return json object */

    /*app.get('/movies', function (req, res) { 
      res.json(top5movies);
    });*/

      /*Return default textual response*/

app.get('/', (req, res) => {
  res.send('Welcome to my FILM list!');
});

    





// Get all movies

app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

      



  





// Get all movie Titles

  app.get('/movies/:Title', (req, res) => {
    Movies.findOne( {Title: req.params.Title })
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });


    /*Return default textual response*/

app.get('/movies/:Title', (req, res) => {
  res.send('Movie Title');
});


  




// Get all movie Genre

  app.get('/movies/:Genre', (req, res) => {
    Movies.findOne( {Genre: req.params.Genre })
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

    /*Return default textual response*/

app.get('/movies/Genre', (req, res) => {
  res.send('Movie Genre');
});








// Get all movie Directors

app.get('/movies/:Director', (req, res) => {
  Movies.findOne( {Director: req.params.Director })
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

 /*Return default textual response*/

app.get('/movies/:Director', (req, res) => {
  res.send('Directors list');
});






// Register User

app.post('/users', (req, res) => {
 Users.findOne( {username: req.body.username })
    .then((user) => { if (user) {
      return res.status(400).send(req.body.username + 'already exists');
    } else {
      users
        .create({ username: req.body.username,
          movieid: req.body.movieid,
          birthday: req.body.birthday
        })
        .then((user) =>{res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});
 
     /*Return default textual response*/

app.post('/users', (req, res) => {
  res.send('Register user');
});

    










//Update users info

app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate({ username: req.params.username }, { $set:
    {
      username: req.body.username,
      movieid: req.body.movieid,
      birthday: req.body.birthday
    }
  },
  { new: true }, // This line makes sure that the updated document is returned
  (err, updateduser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updateduser);
    }
  });
});

/*Return default textual response*/

app.put('/users/:username', (req, res) => {
  res.send('Update users info');
});

    











// Get user's favourite movies

app.get('/users/:movieid', (req, res) => {
  Users.findOne( {movieid: req.params.movieid })
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/*Return default textual response*/

app.get('/users/:movieid', (req, res) => {
  res.send('Favourite movie');
});

  















// Delete a movie from user's favourite

app.delete('/users/:movieid', (req, res) => {
  Users.findOneAndRemove({ movieid: req.params.movieid })
    .then((movieid) => {
      if (!movieid) {
        res.status(400).send(req.params.movieid + ' was not found');
      } else {
        res.status(200).send(req.params.movieid + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/*Return default textual response*/

app.delete('/users/:movieid', (req, res) => {
  res.send('Remove Movie from Favourites');
});

   

















// Deregister a user

app.delete('/users/:username', (req, res) => {
  Users.findOneAndRemove({ username: req.params.username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/*Return default textual response*/

app.delete('/users:username', (req, res) => {
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