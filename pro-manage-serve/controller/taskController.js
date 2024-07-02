const Task = require("../model/taskSchema");
const Assessment = require("../model/assessmentSchema");
const mongoose = require('mongoose')
const moment = require('moment-timezone');
const createTask = async (req, res) => {
  try {  
    console.log("=================Api called========",req.url);
    console.log(req.body)
    const data = req.body
    const newTask = new Task({...data,createdBy:req.user._id});
    await newTask.save()
    res.status(201).json({
      success: true,
      task: newTask,     
      messages: "New task created!"
    })
  } catch (error) {    
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
const updateTask = async (req, res) => {
  try {  
    console.log("=================Api called========",req.url);
    console.log(req.body)
    const taskId=req?.params?.taskId;
    const {...data} = req.body
    console.log(taskId,data)
    const newTask = await Task.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(taskId.toString())}, // Filter
      { $set: { ...data } }, // Update
      { new: true } // Options
    );
    res.status(201).json({
      success: true,
      task: newTask,     
      messages: "Task updated!"
    })
  } catch (error) { 
    console.log(error)   
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const deleteTask = async (req, res) => {
  try {  
    console.log("=================Api called========",req.url);
    console.log(req.body)
    const {taskId} = req.params
    console.log(taskId)
    const newTask = await Task.findByIdAndDelete(
      { _id: new mongoose.Types.ObjectId(taskId.toString()) }
    );
    if(!newTask){
      res.status(404).json({
        success: false,  
        messages: "Task Id not exist!"
      })
      return
    }
    res.status(201).json({
      success: true, 
      newTask:newTask,   
      messages: "Task Deleted!"
    })
  } catch (error) { 
    console.log(error)   
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const getAllTask = async(req,res)=>{
  try {
    console.log("=================Api called========",req.url);
    console.log(req.body,req._id)
    const userId = req.user._id;
    const pipeline =  [
      {
          $match: {
              $or:[
                {createdBy:userId?.toString()},
                {assignedTo:req.user.email}
              ]
            }
      },
      {
          $group: {
              _id: "$currentStatus",
              tasks: { $push: "$$ROOT" } // This will keep all documents in the group
          }
      },
      {
          $project: {
              _id: 0,
              currentStatus: "$_id",
              tasks: 1
          }
      },
      {
          $group: {
              _id: null,
              data: { $push: { k: "$currentStatus", v: "$tasks" } }
          }
      },
      {
          $replaceRoot: {
              newRoot: { $arrayToObject: "$data" }
          }
      }
  ];
   if(req.query && req.query.date){
     const date = req.query.date
     switch(date){
      case 'today':
        pipeline[0].$match.createdAt = {$gte: moment.tz(new Date(), "Asia/Kolkata").startOf('day').toDate()}
        break;
      case 'week':
        pipeline[0].$match.createdAt = {$gte:moment.tz(new Date(), "Asia/Kolkata").subtract(7, 'days').startOf('day').toDate()}
        break;
      case 'month':
        pipeline[0].$match.createdAt = {$gte:moment.tz(new Date(), "Asia/Kolkata").subtract(30, 'days').startOf('day').toDate()}
        break;
      default:{

       }  
      }
   }
    const tasks = await Task.aggregate(pipeline)
    res.status(201).json({
      success: true,
      tasks:tasks,
      })
  } catch (error) { 
    console.log(error)   
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}
//
const getTaskById = async(req,res)=>{
  try {
    console.log("=================Api called========",req.url);
    console.log(req.body)
    const task = await Task.findById(req.params.taskId);
    res.status(201).json({
      success: true,
      task:task,
      })
  } catch (error) { 
    console.log(error)   
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

// anlysis
const getTaskAnalysis = async(req,res)=>{
  try {
    console.log("=================Api called========",req.url);
    console.log(req.body,req._id)
    const userId = req.user._id;
    const pipeline =  [
      {
        $match: {
          $or:[
            {createdBy:userId?.toString()},
            {assignedTo:req.user.email}
          ]
        }
      },
      {
        $facet: {
          byCurrentStatus: [
            {
              $group: {
                _id: "$currentStatus",
                count: { $sum: 1 }
              }
            },
            {
              $group: {
                _id: null,
                statuses: {
                  $push: {
                    k: "$_id",
                    v: "$count"
                  }
                }
              }
            },
            {
              $replaceRoot: {
                newRoot: { $arrayToObject: "$statuses" }
              }
            },
            {
              $project: {
                _id: 0,
                BACKLOG: { $ifNull: ["$BACKLOG", 0] },
                TODO: { $ifNull: ["$TODO", 0] },
                INPROGRESS: { $ifNull: ["$INPROGRESS", 0] },
                DONE: { $ifNull: ["$DONE", 0] }
              }
            }
          ],
          byPriority: [
            {
              $group: {
                _id: "$priority",
                count: { $sum: 1 }
              }
            },
            {
              $group: {
                _id: null,
                priorities: {
                  $push: {
                    k: "$_id",
                    v: "$count"
                  }
                }
              }
            },
            {
              $replaceRoot: {
                newRoot: { $arrayToObject: "$priorities" }
              }
            },
            {
              $project: {
                _id: 0,
                "HIGH PRIORITY": { $ifNull: ["$HIGH PRIORITY", 0] },
                "LOW PRIORITY": { $ifNull: ["$LOW PRIORITY", 0] },
                "MODERATE PRIORITY": { $ifNull: ["$MODERATE PRIORITY", 0] }
              }
            }
          ],
          dueCount: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: {
                    $cond: {
                      if: { $ne: ["$dueDate", null] },
                      then: 1,
                      else: 0
                    }
                  }
                }
              }
            }
          ]
        }
      },
      {
        $project: {
          byCurrentStatus: { $arrayElemAt: ["$byCurrentStatus", 0] },
          byPriority: { $arrayElemAt: ["$byPriority", 0] },
          dueCount: { $arrayElemAt: ["$dueCount.count", 0] }
        }
      },
      {
        $project: {
          byCurrentStatus: {
            BACKLOG: { $ifNull: ["$byCurrentStatus.BACKLOG", 0] },
            TODO: { $ifNull: ["$byCurrentStatus.TODO", 0] },
            INPROGRESS: { $ifNull: ["$byCurrentStatus.INPROGRESS", 0] },
            DONE: { $ifNull: ["$byCurrentStatus.DONE", 0] }
          },
          byPriority: {
            "HIGH_PRIORITY": { $ifNull: ["$byPriority.HIGH PRIORITY", 0] },
            "LOW_PRIORITY": { $ifNull: ["$byPriority.LOW PRIORITY", 0] },
            "MODERATE_PRIORITY": { $ifNull: ["$byPriority.MODERATE PRIORITY", 0] }
          },
          dueCount: 1
        }
      }
    ]
    const tasks = await Task.aggregate(pipeline)
    res.status(201).json({
      success: true,
      tasks:tasks,
      })
  } catch (error) { 
    console.log(error)   
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getTaskById,
  getTaskAnalysis
};