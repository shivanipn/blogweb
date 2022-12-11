const UserModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController{
    static AdminRegister = async(req,res)=>{
        res.render('admin/register',({message:req.flash('error')}))
    }
    static Register = async(req,res)=>{
        // res.render('admin/register')
        // console.log(req.body)
        // input wale name hai ye jo form me hai inhe variable me store krlia
        const{name,email,password,c_password} = req.body; 
        const admin = await UserModel.findOne({email:email})
        if(admin){
           req.flash('error','Email Alreadt Exists!')
            return res.redirect('/admin/register')
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
                        req.flash('success','Registration successfully ! please login')
                        return res.redirect('/login')
                        
                    }catch(err){
                        console.log(err)
                    }

                }else{
                req.flash('error','Password and Confirm Password does not Match!')
                return res.redirect('/admin/register')
                }

            }
            else{
                req.flash('error','All Feilds Are Require')
                return res.redirect('/admin/register')
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
                        const token = jwt.sign({ userId: user._id }, 'shivi888');
                        res.cookie('token', token)
                        //  console.log(token)
                        res.redirect('/admin/dashboard')

                    }else{
                        req.flash('error','Email or Password is not Matched')
                        return res.redirect('/login')
                    }
               }else{
                    req.flash('error','You are not Registered!')
                     return res.redirect('/login')
                }

            }else{
                req.flash('error','All feilds are require!')
                return res.redirect('/login')
            }
        }catch(err){
            console.log(err)
        }
    }

    static Logout = async(req,res)=>{
        try{
            res.clearCookie('token')
            res.redirect('/login')
        }catch(err){
            console.log(err)
        }
    }


}
module.exports = UserController
