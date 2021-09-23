const express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const Movies = Models.Movie;
const Users = Models.User;


/*Import express & morgan*/


const app = express();
app.use(bodyParser.json());
/*mongoose.connect('mongodb://localhost:27017/dbname', { useNewUrlParser: true, useUnifiedTopology: true });*/
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require('cors');
app.use(cors());
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.use(morgan('common'));






// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my Movie API!');
});





// Get all movies

app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
   Movies.findOne( {Title: req.params.Title })
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });







// Get all movie Genre

app.get('/movies/Genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne( {'Genre.Name': req.params.Name}) 
      .then((movie) => {
        res.status(201).json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });






// Get info about a movie director

app.get('/movies/Director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne( {'Director.Name': req.params.Name })
    .then((movie) => {
      res.status(201).json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});





// Get app users

app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});




// Get one username

app.get('/users/Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
  .then((users) => {
    res.status(201).json(users);
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});





// Register User

app.post('/users',  [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
   // check the validation object for errors
   let errors = validationResult(req);

   if (!errors.isEmpty()) {
     return res.status(422).json({ errors: errors.array() });
   }
  let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
            FavouriteMovies: req.body.FavouriteMovies
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
















//Update users info

app.put('/users/:Username',  [
  check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
],
passport.authenticate('jwt', { session: false }),
(req, res) => {
  // check the validation object for errors
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
      FavouriteMovies: req.body.FavouriteMovies
    },
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



  










// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', /*passport.authenticate('jwt', { session: false }),*/ (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $push: { FavoriteMovies: req.params.MovieID }
   },
   { new: true }, // This line makes sure that the updated document is returned
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});














// Delete a movie from user's favourite

app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Movieid: req.params.Movieid })
    .then((Movieid) => {
      if (!Movieid) {
        res.status(400).send(req.params.Movieid + ' was not found');
      } else {
        res.status(200).send(req.params.Movieid + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});














// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
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
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

