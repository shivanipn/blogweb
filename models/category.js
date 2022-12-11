const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({  //object
    title:{             //feild
        type:String,
        Required:true
    },
    description:{
        type:String,
        Required:true
    },
    name:{
        type:String,
        Required:true
    },
    email:{
        type:String,
        Required:true
    },
})
const CategoryModel = mongoose.model('category',CategorySchema)

module.exports = CategoryModel