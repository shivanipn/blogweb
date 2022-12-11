const mongoose = require('mongoose')

const connectdb = ()=>{
    //  con="mongodb+srv://shareenkhan04:ashreen1997@cluster0.quyezlo.mongodb.net/blogweb?retryWrites=true&w=majority"
     con = "mongodb+srv://shivani121:shivi888@cluster0.emxdhgh.mongodb.net/expressblog?retryWrites=true&w=majority"

    //return mongoose.connect('mongodb://localhost:27017/blog_project') //mongodb host name
    return mongoose.connect(con)
    .then(()=>{
        console.log('connected successfully')
    }).catch((err)=>{
        console.log(err)
    })

}
module.exports = connectdb
