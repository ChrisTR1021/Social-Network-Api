const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/userThoughtDB', {
    
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Export connection 
module.exports = mongoose.connection;