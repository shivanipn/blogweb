const jwt = require('jsonwebtoken')
const UserModel = require('../models/User')

const CheckUserAuth = async(req,res,next)=>{

  const {token} = req.cookies;

  // console.log(token)
  if(!token){
    req.flash('error','UnAuthorised User, Please Login')
    return res.redirect('/login')
  }else{
    const verify_token = jwt.verify(token,'shivi888')
    // console.log(verify_token)
    const data = await UserModel.findOne({_id:verify_token.userId})
     console.log(data)
    req.data1= data;
    next()
  }
  console.log(token)
    // console.log('Not Authorised User')
  
}
module.exports = CheckUserAuth
// middleware security ke liye user krte hai ye     REQUEST AND RESPONSE  ke bich kam krta hai