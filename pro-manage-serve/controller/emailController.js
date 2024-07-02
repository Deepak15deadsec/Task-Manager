const People =require("../model/peopleEmailSchema");
const createPeopleMail = async(req,res)=>{
    try {
        const people = await People.create(req.body);
        res.status(201).json({
            success:true,
            message:"people mail created!!!!",
            people
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const getPeopleMail = async(req,res)=>{
    try {
        const pipeline=[
            {
              $group: {
                _id: null,
                emails: {
                  $addToSet: "$email"
                }
              }
            },
            {
              $project: {
                _id: 0,
                emails: 1
              }
            }
          ]
        const [peopleMail] = await People.aggregate(pipeline);
        res.status(201).json({
            success:true,
            message:"All people mail!!!!",
            peopleMail
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports ={getPeopleMail,createPeopleMail}