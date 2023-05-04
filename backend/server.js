const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const Token = require('./Token');

const app = express();
app.use(cors());
const port = 3000;

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// GET endpoint
app.get('/tokens', (req, res) => {
  const { address } = req.query;
  console.log("address is " + address);
  Token.find({ creator: address })
      .then( (tokens) => {
          res.json(tokens);
        })
      .catch( (error) => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      })
      
});

// POST endpoint
app.post('/tokens', (req, res) => {
    const { creator, imageUrl, name, symbol, chain, contract } = req.body;
    
    // Create a new token with the given details
    const token = new Token({ creator, imageUrl, name, symbol, chain, contract });
    console.log(token);
    // Save the token to the database
    

    token.save()
    .then(savedToken => {
      res.json(savedToken);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });

  });
  

// start the server
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
});
