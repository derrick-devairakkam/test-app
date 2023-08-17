const express = require('express');

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const sessionController = require('../controllers/sessionController');
const taskController = require('../controllers/taskController');

const router = express.Router();

// route handler for signup
router.post('/signup', userController.createUser, (req, res) => {
    console.log('/signup POST request has fired')
    res.sendStatus(200);
});

// route handler for login 
router.post('/login', userController.verifyUser, sessionController.createSession, (req, res) => {
  console.log('/login POST request has fired')
  res.status(200).json(res.locals.user_id);
});

// route handler to get tasks for homepage
router.get('/tasks', taskController.getTasks, (req, res) => {
    console.log('/tasks GET request for taskController.getTasks has fired');
    res.status(200).json(res.locals.tasks);
  });

// route handler to post tasks and return tasks for frontend rerender
router.post('/tasks', taskController.setTask, (req, res) => {
    console.log('/tasks POST request for taskControler.setTask has fired');
    res.status(200).json(res.locals.newTask);
  });

// route handler for updating tasks
router.put('/tasks', taskController.updateTask, (req, res) => {
  console.log('/put fired lil bitch');
  res.sendStatus(200);
});

// route handler to delete tasks
router.delete('/tasks', taskController.deleteTask, (req, res) => {
  console.log('/tasks DELETE request for taskController.deleteTask has fired');
  res.sendStatus(200);
});

// route handler to logout user
router.get('/logout', cookieController.clearCookie, (req, res) => {
  console.log('/logout route hit');
  req.session.destroy();
  res.send("Session destroyed.");
});

module.exports = router; 