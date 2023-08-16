const model = require('../models/models');

const taskController = {};

taskController.getTasks = async (req, res, next) => {

  console.log('req.body in getTasks: ', req.cookies)
  const user_id = req.cookies.user_id;
  console.log('user_id', user_id);
  try {
    const tasks = await model.Task.find({user_id: user_id});
    console.log(tasks);
    res.locals.tasks = tasks;
    return next();
  } catch (error) {
    return next(error);
  }

};

taskController.setTask = async (req, res, next) => {

  const today = new Date();

  console.log('req.body', req.body);

  const { taskName } =  req.body;
  const user_id = req.cookies.user_id;
  console.log(taskName);
  console.log(user_id);

  try {
    const newTask = await model.Task.create({taskName: taskName, count: 0, dateCreated: today, user_id: user_id }, )
    res.locals.task = newTask;
    return next();
  } catch (error) {
    return next(error);
  }

};

// taskController.updateTask = async (req, res, next) => {

//   const user_id = req.cookies.user_id;
//   console.log('user_id', user_id);
//   const taskName = req.body.taskName;
//   console.log('taskName ', taskName);

//   try {
//     const update = await model.Task.findOneAndUpdate({user_id, taskName }, { $inc: { count: 1 }}, { new: true });
//     console.log(update);
//     return next();
//   } catch(error) {
//     return next(error);
//   }

// };

taskController.deleteTask = async (req, res, next) => {

  const user_id = req.cookies.user_id;
  const taskName = req.body.taskName;

  try {
    const deleted = await model.Task.findOneAndDelete({ user_id, taskName});
    console.log(deleted);
    return next();
  } catch(error) {
    return next(error);
  }

};

module.exports = taskController;