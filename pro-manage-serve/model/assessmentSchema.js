const mongoose = require('mongoose');
const assessmentSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.ObjectId,
        ref:'Quiz'
    },
    questionId: {
        type: mongoose.Schema.ObjectId,        
    },
    quizType: {
        type: String,
        enum:["Q&A","Poll_Type"]
    },    
    attemptedPeople:{
        type:Number,
        default:0
    },
    correctAnswered:{
        type:Number,
        default:0
    },
    incorrectAnswered:{
        type:Number,
        default:0
    },
    option1:{
        type:Number,
        default:0
    },
    option2:{
        type:Number,
        default:0
    },
    option3:{
        type:Number,
        default:0
    },
    option4:{
        type:Number,
        default:0
    },
    createdOn: {
        type: Date,
        default: Date.now
      } 
},
{
  timestamps:true
})

const AssessmentSchema = mongoose.model("AssessmentSchema", assessmentSchema);
module.exports = AssessmentSchema;