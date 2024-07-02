const jwt = require('jsonwebtoken');
const accessTokenExpTime=process.env.JWT_ACCESS_TOKEN_EXIPREAT;
const refreshTokenExpTime=process.env.JWT_REFRESH_TOKEN_EXIPREAT;
const getRefereshToken=async(id)=>{
    const refereshToken = jwt.sign(
        {_id:id},
        process.env.JWT_REFRESH_TOKEN_KEY,
        {expiresIn:refreshTokenExpTime}
    )   
    return refereshToken;
}

const getAccessToken=async(id)=>{
    const accessToken = jwt.sign(
        {_id:id},
        process.env.JWT_ACCESS_TOKEN_KEY,
        {expiresIn:accessTokenExpTime}
    )
    return accessToken
 }

 module.exports={getRefereshToken,getAccessToken};