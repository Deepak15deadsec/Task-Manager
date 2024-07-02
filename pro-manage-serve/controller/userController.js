const { getAccessToken, getRefereshToken } = require('../middleware/tokenMiddleware');
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const passwordHash =require("password-hash");
const registerUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;       
        const userDetails=await User.find({email:email});
        if(userDetails.length){
            return res.status(400).json({
                success: false,
                message: "User already exist!"
            })
        }
        let hashPassword = passwordHash.generate(password);
        const newUser = new User(req.body);
        newUser.isLoggedIn = false;
        newUser.password=hashPassword;
        const user = await newUser.save();
        res.status(201).json({
            success: true,                   
            message:"User registered successfully!"            
        });
    } catch (error) {           
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;                  
       // create a entry in data base
        const user = await User.findOne({ email: email }).select("+password"); 
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid username or password"
            })
        }   
        // validate password
        const passwordMatch = await passwordHash.verify(
            password,
            user.password
          );
          if (!passwordMatch) {
            return res
              .status(404)
              .json({ 
                success: false,
                message: "Password is incorrect" 
            });
          }
        // generate access and refres token
        const accessToken = await getAccessToken(user._id);
        const refreshToken = await getRefereshToken(user._id);
        let ussrr = await User.findOneAndUpdate(
            { _id: user._id.toString() },
            {
                refreshToken: refreshToken,                
            },
            { new: true }
        ); 
        res.status(200).json({
            success: true,
            isLoggedIn:true,
            user: ussrr,
            accessToken
        })
    } catch (error) {             
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
const logoutUser = async (req, res) => {
    try {
        const _id = req.user._id;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found !!!!"
            })
        }
        user.refreshToken = null;
        user.isLoggedIn=false;
        await user.save()
        res.status(200).json({
            success: true,
            isLogout:true,
            message:"User logout successfully!"
        })
    } catch (error) {     
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const getNewAccessToken=async(req,res)=>{
    try{        
        const refreshToken=req.body.refreshToken;
        let accessToken=null;        
        const {_id} = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_KEY);             
        if(_id){
          const user = await User.findById(_id);          
          if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
          }
          accessToken = await getAccessToken(user._id);          
          return res.status(200).json({
            success:true,
            message:"Get new access token!",
            accessToken
          });
        }else{
            return res.status(400).json({
                success:false,
                message:"Invalid refresh token!"
            })
         }
    }catch(error){        
        return res.status(400).json({
            success:false,
            message:"Something went wrong!",
          });
    }
}

const updateDetails = async(req,res)=>{
    try {
       const id = req.user._id;
       if(req.body.password){
           req.body.password = await passwordHash.generate(req.body.password);
       }
       const updatedDetails = await User.findOneAndUpdate(
           {_id:id},
           { $set:{
               ...req.body
            }
           },
           {new :true}
       )
       res.status(200).json({
           success:true,
           message:"User details updated successfully!",
           updatedDetails
       })
    } catch (error) {
       console.log(error)
       return res.status(400).json({
           success:false,
           message:"Something went wrong!",
         });
    }
   }

module.exports = { 
    registerUser,    
    loginUser, 
    logoutUser,
    getNewAccessToken,
    updateDetails
 }

