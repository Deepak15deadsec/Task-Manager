const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    quizName: {
        type: String
    },
    quizType: {
        type: String,
        enum:["Q&A","Poll_Type"]
    },
    quizQuestions: [
        {
            question:{
                type:String
            },
            optionType:{
                type:String,
                enum:["Text","ImageUrl","Text_ImageUrl"]
            },
            options: [],
            answer:{
                type:mongoose.Schema.Types.Mixed,
            },
            timer:{
                type:Number
            }
        }
    ],
    impression:{
        type:Number,
        default:0
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"

    },
    createdOn: {
        type: Date,
        default: Date.now
      } 
},
{
  timestamps:true
})

const QuizSchema = mongoose.model("QuizSchema", quizSchema);
module.exports = QuizSchema;