//config set up
// require('dotenv').config({path:"./config/config.env"})
require('dotenv').config();
const app = require('./app');
const dbConnection = require('./connection/db');

//data base connection
dbConnection()

const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is live on PORT : ${PORT}`)
})