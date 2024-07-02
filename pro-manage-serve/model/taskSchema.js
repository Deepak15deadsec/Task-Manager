const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task:String,
    priority:String,
    assignTo:String,
    checkList:Array,
    dueDate:String,
    currentStatus:String,
    createdBy:String
},
{
    timestamps:true
  }
)

const Task = mongoose.model("Task",taskSchema);
module.exports = Task;