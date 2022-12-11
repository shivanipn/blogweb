const cloudinary = require('cloudinary').v2;
const BlogModel = require('../../models/blog')

cloudinary.config({ 
    cloud_name: 'dazbzgyfu', 
    api_key: '927784744576637', 
    api_secret: 'K3fLtBgAfXBDjMJzeg4CtVL4EDM',
    // secure: true
  });

const TeacherModel = require('../../models/Teacher')


class AdminController{
    static dashboard = async(req,res)=>{
        const{name,email} = req.data1
        res.render('admin/dashboard',{n:name,e:email})
    }

    static Blogs = async(req,res)=>{
        const data = await BlogModel.find()
        // console.log(data);
        res.render('admin/blog/blogdisplay',{d:data})   //d me data store ho view se table me show kr dega
    }

    static Addblogs = async(req,res)=>{
        res.render('admin/blog/addblogs')
    }

    static insertblog = async(req,res)=>{
        // console.log(req.body)
        //  console.log(req.files)
       const imagefile = req.files.blog_image
    //    console.log(imagefile)
        const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
            folder: "blog_image",
            width:400,
        })
        try{
            const result = new BlogModel({
                title:req.body.title,
                // image:image_upload.secure_url,
                image: {
                    public_id: image_upload.public_id,
                    url:image_upload.secure_url,
                },
                description:req.body.description
                
            })
            //saving data
            await result.save()
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
    }
    static BlogView = async(req,res)=>{
        // console.log(req.params.id)
        const data = await BlogModel.findById(req.params.id)
        //console.log(data)
        res.render('admin/blog/blogview',{viewdata:data})
    }

    static BlogEdit = async(req,res)=>{
        // console.log(req.params.id)
        const data = await BlogModel.findById(req.params.id)
        //console.log(data)
        res.render('admin/blog/blogedit',{editdata:data})
    }

    static BlogUpdate = async(req,res)=>{
        // console.log(req.body)
        // console.log(req.params.id)
        try{
            const user = await BlogModel.findById(req.params.id)
            const image_id = user.image.public_id;
            //  console.log(image_id)
            await cloudinary.uploader.destroy(image_id)
            const imagefile = req.files.blog_image
            //    console.log(imagefile)
                const image_upload = await cloudinary.uploader.upload(imagefile.tempFilePath,{
                    folder: "blog_image",
                    width:400,
                })

            const data = await BlogModel.findByIdAndUpdate(req.params.id,{
                title:req.body.title,
                description:req.body.description,
                image: {
                    public_id: image_upload.public_id,
                    url:image_upload.secure_url,
                },
            })
            await data.save()
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
        
    }
    static BlogDelete = async(req,res)=>{
        // console.log(req.params.id)
        try{
            const user = await BlogModel.findById(req.params.id)
            const image_id = user.image.public_id;
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id)
            const result = await BlogModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = AdminController