const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const router = require('./routes/routes');

const PORT = 3000;
const app = express();

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true , useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log(`Connected to DB son! (They don't know me)`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));

// use all routes in routes folder
app.use('/api', router);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('404 page not found'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});