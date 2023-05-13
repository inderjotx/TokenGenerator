const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const Token = require('./Token');
const axios = require('axios');
const { Configuration , OpenAIApi } = require("openai");

require('dotenv').config();

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const DALLE_API_KEY = process.env.OPENAI_API_KEY;


const configuration = new Configuration({
  apiKey: DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

app.get('/unsplash', (req, res) => {
  const { query } = req.query;

  axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API_KEY}&per_page=50`)
    .then(response =>   response.data)
    .then(images => {
      const array = images.results.map(obj => obj.urls.regular);
      res.status(200).json(array);
    })
    .catch(error => {
      res.status(400).json({ error: 'Bad Request' });
    });
});


app.get( '/dalle', (req, res) => {

  const { query } = req.query;

  console.log(query);

      openai.createImage({
      prompt: query,
      n: 4,
      size: "512x512",
      }).then( (response) => {
        const images = response.data.data.map( (obj) => obj.url );
        res.status(200).json(images);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json( { error : 'Bad Request'})
      })

  
})


// POST endpoint
app.post('/tokens', (req, res) => {
    const { creator, imageUrl, name, symbol, chain, contract } = req.body;
    
    // Create a new token with the given details
    const token = new Token({ creator, imageUrl, name, symbol, chain, contract });
   
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
