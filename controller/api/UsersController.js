const UserModel = require('../../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UsersController{

    static Register = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        // input wale name hai ye jo form me hai inhe variable me store krlia
        const{name,email,password,c_password} = req.body; 
        const admin = await UserModel.findOne({email:email})
        if(admin){
           res.send({status: "failed" , message: "Email Already Exists!"})
        }
        else{
            if(name && email && password && c_password){
                if(password == c_password){
                    try{
                        const hashpassword =await bcrypt.hash(password,10)
                        const result = await UserModel({
                            name:name,
                            email:email,
                            password:hashpassword,
                        })
                        await result.save()
                        res.send({status: "success" , message: "Registration successfully ! please login"})
                        
                    }catch(err){
                        console.log(err)
                    }

                }else{
                 res.send({status: "failed" , message: "Password and Confirm Password does not Match!"})   
                }

            }
            else{
                res.send({status: "failed" , message: "All Feilds Are Require"})   
            }
        }

     
    }

    static VerifyLogin = async(req,res)=>{
        try{
            const{email,password} = req.body;
            // console.log(password)
            if(email && password){
                const user = await UserModel.findOne({email:email})
                // console.log(user.password)
                if(user != null){
                    const isMatched = await bcrypt.compare(password,user.password)
                    if((user.email=== email)&& isMatched){
                        //verify token
                        const token = jwt.sign({ userId: user._id }, 'ashreenkhan');
                        res.cookie('token', token)
                        //console.log(token)
                        res.send({status: "success" , message: "login successfully with", "token":token})
                        // res.redirect('/admin/dashboard')

                    }else{
                        res.send({status: "failed" , message: "Email or Password is not Matched"})
                        
                    }
               }else{
                res.send({status: "failed" , message: "You are not Registered!"})
                 //  return res.redirect('/login')
                }

            }else{
                res.send({status: "failed" , message: "All !"})
                
            }
        }catch(err){
            console.log(err)
        }
    }

    static Logout = async(req,res)=>{
        try{
            res.clearCookie('token') 
            res.send({status: "success" ,message:"Logout Successfully"})
            // res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }

}
module.exports= UsersController