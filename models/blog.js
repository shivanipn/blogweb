const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({  //object
    title:{ //feild
        type:String,
        Required:true
    },
    description:{
        type:String,
        Required:true
    },
    image:{
        public_id:{  
            // image ka unique name aayega....image ki id aajaygi
        type:String,
        Required:true
    },
    url:{
        type:String,
        Required:true
    },
},
},
{timestamps:true})
const BlogModel = mongoose.model('blog',BlogSchema)

module.exports = BlogModel