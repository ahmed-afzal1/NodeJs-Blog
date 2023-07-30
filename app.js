require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')
const { MongoClient } = require('mongodb');
const connectDB = require('./server/config/db');


const app = express();
const PORT = 5000 || process.env.PORT;

connectDB();

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

const client = new MongoClient('mongodb://localhost:27017');
client.connect().then(() => {
  const store = new MongoStore({
    clientPromise: Promise.resolve(client),
    dbName: 'blogs',
    collection: 'blog-session',
  });

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      store: store,
    })
  );
});

app.use(express.static('public'));

//Template engine setup
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));
app.use('/admin', require('./server/routes/admin'));

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})