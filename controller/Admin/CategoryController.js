const CategoryModel = require('../../models/category')

class CategoryController{
    static CategoryDisplay = async(req,res)=>{
        const data = await CategoryModel.find()
        // console.log(data);
        res.render('admin/category/categorydisplay',{d:data})
    }

    static CreateCategory = async(req,res)=>{
        res.render('admin/category/createcategory')
    }

    static CategoryInsert = async(req,res)=>{
        // console.log(req.body);

        // console.log(req.body.title);
        try{
            const result = new CategoryModel({
                title:req.body.title,         //name k andar title define kia hai ye wo hai...
                description:req.body.description,
                name:req.body.name,
                email:req.body.email
            })
            await result.save()  //await for no waiting.
            res.redirect('/admin/category')     //redirect-> route ke url ka path dete hai
        }catch(err){
            console.log(err);
        }
    }

    static CategoryView = async(req,res)=>{
        //console.log(req.params.id)   //id ko get krte h params se
        const data = await CategoryModel.findById(req.params.id)  //findmyid se perticular id uth k aati h
        // console.log(data)
        res.render('admin/category/categoryview',{viewdata:data})
    }

    static CategoryEdit = async(req,res)=>{
        // console.log(req.params.id)
        const data = await CategoryModel.findById(req.params.id)
        // console.log(data)
        res.render('admin/category/categoryedit',{editdata:data})
    }

    static CategoryUpdate = async(req,res)=>{
        // console.log(req.body)
        // console.log(req.params.id)
        try{
            const data = await CategoryModel.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            description:req.body.description,
            name:req.body.name,
            email:req.body.email
        })
        await data.save()
        res.redirect('/admin/category')
            }catch(err){
                console.log(err)
        }
    }
    
    static CategoryDelete = async(req,res)=>{
        // console.log(req.params.id)
        try{
            const data = await CategoryModel.findById(req.params.id)
            const title = data.title;
             console.log(title)
            // await cloudinary.uploader.destroy(image_id)
            const result = await CategoryModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/category')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports = CategoryController