const mongoose = require('mongoose');
require('dotenv').config();


const URL = process.env.URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});

module.exports = mongoose.connection;
