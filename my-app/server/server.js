const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
// const cors = require('cors');
// const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const PORT = 3000;
// const MongoDBStore = require('connect-mongodb-session')(session);
// require('dotenv').config();

const app = express();

// app.use(cors());
app.use(cookieParser());

const mongoURI = 'mongodb+srv://thomaskpappas:8xieuuLjy7jmlGEc@cluster0.yk1ahpq.mongodb.net/?retryWrites=true&w=majority';
const encodedURI = encodeURIComponent(mongoURI);

mongoose.connect(encodedURI, { useUnifiedTopology: true , useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log(`Connected to DB son! (They don't know me)`);
});

// mongoose.connect('mongodb+srv://chuckfranco:EeyAv93wlQ1Zivw4@osp-to-do.vijc7fi.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true , useNewUrlParser: true } );
// mongoose.connection.once('open', () => {
//   console.log('Connected to DB son!');
// });

// mongoose.connect('mongodb+srv://thomaskpappas:8xieuuLjy7jmlGEc@cluster0.yk1ahpq.mongodb.net/', { useUnifiedTopology: true , useNewUrlParser: true } );


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const store = new MongoDBStore({
//     uri: 'mongodb+srv://thomaskpappas:8xieuuLjy7jmlGEc@cluster0.yk1ahpq.mongodb.net/?retryWrites=true&w=majority',
//     collection: 'sessions' // Name of the collection where sessions will be stored
//   });
  
//   const sessionConfig = {
//     store,
//     secret: 'secret',
//     saveUninitialized: false,
//     resave: false,  
//     cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
//     user_id: "",
//     authentication: false
//   };

// app.use(session(sessionConfig))

// serve static pages
// app.use('/client', express.static(path.resolve(__dirname, '../src')));
// app.use('/client', express.static(path.resolve(__dirname, '../public')));

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

module.exports = app;