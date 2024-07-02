const { default: mongoose } = require("mongoose")

async function dbConnection(){
     try {
         await mongoose.connect(process.env.DB_URL);
         console.log("=======Data base connected successfulyy=========")
     } catch (error) {       
        console.log(error)
        setTimeout(dbConnection,5000)
     }
}
module.exports = dbConnection