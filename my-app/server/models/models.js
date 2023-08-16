const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});

const taskSchema = new Schema({
  taskName: {type: String, required: true},
  count: {type: Number, required: true},
  dateCreated: {type: Date, required: true},
  user_id: {type: Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);

const Task = mongoose.model('Task', taskSchema);

module.exports = {User, Task};