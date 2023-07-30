const mongoose = require('mongoose')

// database connection with mongoose
const connectDB = async =>{
    mongoose.connect('mongodb://localhost:27017/blogs')
      .then(() => console.log('Connection successful'))
      .catch((err) => console.error('Connection error:', err));
}


module.exports = connectDB;