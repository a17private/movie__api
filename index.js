const express = require('express'),
morgan = require('morgan');
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;


/*Import express & morgan*/


const app = express();

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(morgan('common'));






// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my MOVIE API!');
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


  




// Get all movie Genre

app.get('movies/Genre/:Name', (req, res) => {
   Movies.findOne( {Genre: req.params.Genre })
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
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