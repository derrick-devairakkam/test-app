const model = require('../models/models');

const taskController = {};

// mioddleware to retrieve a users tasks
taskController.getTasks = async (req, res, next) => {

  const user_id = req.session.user_id;

  try {
    const tasks = await model.Task.find({user_id: user_id});
    console.log('tasks', tasks);
    res.locals.tasks = tasks;
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 400,
      message: {error: 'Error occurred in taskController.getTasks middleware'}
    })
  }
};

// middleware to create a task
taskController.setTask = async (req, res, next) => {

  const today = new Date();
  const { text } =  req.body;
  const user_id = req.session.user_id;

  try {
    const newTask = await model.Task.create({taskName: text, count: 0, dateCreated: today, user_id: user_id }, )
    res.locals.task = newTask;
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 400,
      message: {error: 'Error occurred in taskController.setTask middleware'}
    })
  }
};

// middleware to update task name
taskController.updateTask = async (req, res, next) => {

  const { id, taskName } = req.body;

  try {
    await model.Task.findOneAndUpdate({ _id: id }, { taskName: taskName }, { new: true });
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 400,
      message: {error: 'Error occurred in taskController.updateTask middleware'}
    })
  }
};

// middleware to delete a task associated with the user
taskController.deleteTask = async (req, res, next) => {

  const { id } = req.body.id;

  try {
    await model.Task.findOneAndDelete({ id });
    return next();
  } catch (error) {
    return next({
      log: error,
      status: 400,
      message: {error: 'Error occurred in taskController.deleteTask middleware'}
    })
  }
};

module.exports = taskController;