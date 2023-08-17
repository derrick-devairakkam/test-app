const model = require('../models/models');

const taskController = {};

taskController.getTasks = async (req, res, next) => {

  // console.log('req.body in getTasks: ', req.cookies)
  const user_id = req.session.user_id;
  // console.log('user_id', user_id);
  try {
    const tasks = await model.Task.find({user_id: user_id});
    console.log('tasks', tasks);
    res.locals.tasks = tasks;
    return next();
  } catch (error) {
    return next(error);
  }

};

taskController.setTask = async (req, res, next) => {

  const today = new Date();

  console.log('req.body', req.body);

  const { text } =  req.body;
  const user_id = req.session.user_id;
  console.log(text);
  console.log(user_id);

  try {
    const newTask = await model.Task.create({taskName: text, count: 0, dateCreated: today, user_id: user_id }, )
    res.locals.task = newTask;
    return next();
  } catch (error) {
    return next(error);
  }

};

taskController.updateTask = async (req, res, next) => {

  // const user_id = req.session.user_id;
  // console.log('user_id', user_id);
  // const id = req.body.id;
  // console.log('taskName ', taskName);
  const { id, taskName } = req.body;

  try {
    const update = await model.Task.findOneAndUpdate({ _id: id }, { taskName: taskName }, { new: true });
    console.log(update);
    return next();
  } catch(error) {
    return next(error);
  }
};

taskController.deleteTask = async (req, res, next) => {
  console.log('req.body', req.body);

  // const user_id = req.session.user_id;
  const { id } = req.body.id;


  try {
    const deleted = await model.Task.findOneAndDelete({ id });
    console.log(deleted);
    return next();
  } catch(error) {
    return next(error);
  }

};

module.exports = taskController;