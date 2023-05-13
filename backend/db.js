const mongoose = require('mongoose');
const URL = "mongodb+srv://inderjotsingh:9878344133@tokendatabase.d4g2b3r.mongodb.net/?retryWrites=true&w=majority"

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
