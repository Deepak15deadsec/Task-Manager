const express = require('express');
const cors = require('cors');
const bodyParser=require("body-parser");
const app = express();
const userRouter = require('./router/userRouter')
const taskRouter = require('./router/taskRouter')
const emailRouter = require('./router/peopleEmailRouter')
app.use((err,req,res,next)=>{
    err.statusCode=err.statusCode;    
     err.message=err.message||"Internal Server Error"
     res.status(err.statusCode).json({
        success:false,
        message:err.message
    })}
)
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
  const corsOptions = {
    origin: "*",
    credentials: true, 
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOptions));

//router setup
app.use('/user',userRouter);
app.use('/task',taskRouter);
app.use('/email',emailRouter)
app.get("/",async(req,res)=>{    
    res.status(200).json({
      message:"Serve is up!"
    });
});



module.exports = app;