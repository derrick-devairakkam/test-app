const express = require('express');
// const path = require('path');
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Signup route handler
router.post('/signup', userController.createUser, (req, res) => {
    
    console.log("Post request for /signup")
    res.sendStatus(200);
});

// login router handler 
router.post('/login', userController.verifyUser, sessionController.createSession, 
(req, res) => {
  console.log("Post request for /login")
  console.log('req.session', req.session);
  res.status(200).json(res.locals.user_id);
});

// route handler to get recipes for recipe page
router.get('/tasks', taskController.getTasks, (req, res) => {
    console.log('/tasks GET request for taskController.getTasks has fired');
    res.status(200).json(res.locals.tasks);
  });

// route handler to post recipes and return posting to render on frontend
router.post('/tasks', taskController.setTask, (req, res) => {
    console.log('/tasks POST request for taskControler.setTask has fired');
    res.status(200).json(res.locals.newTask);
  });

router.put('/tasks', taskController.updateTask, (req, res) => {
  console.log('/put fired lil bitch');
  res.sendStatus(200);
});

// route handler to delete recipes
router.delete('/tasks', taskController.deleteTask, (req, res) => {
  console.log('/tasks DELETE request for *** has fired');
  res.sendStatus(200);
});

// // route handler to retrieve user recipes for the homepage and parse data for randomized week with additional parameters 
// router.post('/homepage', (req, res) => {
//     console.log('/homepage POST request for recipeController.getRecipes, recipeController.getIngredients & gernationController.handleUserData has fired');
//     res.status(200).json(res.locals);
// });

// // route handler to render recipe generation if user already generated a set
// router.get('/homepage', sessionController.isLoggedIn, (req, res) => {
//   console.log('/homepage GET request for generationController.fetchCreatedData has fired');
//   res.status(200).json(res.locals.data);
// });

//userController -> verifyUser, setSSIDcookie, start session

//logout user
router.get('/logout', cookieController.clearCookie, (req, res) => {
  console.log('/logout route hit');
  req.session.destroy();
  res.send("Session destroyed.");
});

module.exports = router; 