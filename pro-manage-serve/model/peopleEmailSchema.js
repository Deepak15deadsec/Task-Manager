const mongoose  = require('mongoose');


const peopleSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: [true, 'Email already exists!!!'],
        required:true
    }
},
{
    timestamps:true
}
)
const People = mongoose.model("People",peopleSchema)
module.exports = People;