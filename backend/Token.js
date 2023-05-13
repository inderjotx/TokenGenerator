const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  creator: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  chain: {
    type: String,
    required: true
  },
  contract: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Token', tokenSchema);
