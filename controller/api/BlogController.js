const BlogModel = require('../../models/blog')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dazbzgyfu',
    api_key: '927784744576637',
    api_secret: 'K3fLtBgAfXBDjMJzeg4CtVL4EDM',
    // secure: true
});


class BlogController {
    static Blogs = async (req, res) => {
        const blogs = await BlogModel.find()
        // console.log(data);
        try {

            res.status(200).json({
                success: true,
                blogs
            })

        } catch (err) {
            console.log(err)
        }
    }

    static BlogInsert = async (req, res) => {
        // console.log(req.body)
        //  console.log(req.files)
        const Blogimage = req.files.image
        //    console.log(imagefile)
        const BlogImage_upload = await cloudinary.uploader.upload(Blogimage.tempFilePath, {
            folder: "Blog_image",
            width: 400,
        })
        try {
            const result = new BlogModel({
                title: req.body.title,
                // image:image_upload.secure_url,
                image: {
                    public_id: BlogImage_upload.public_id,
                    url: BlogImage_upload.secure_url,
                },
                description: req.body.description

            })
            //saving data
            await result.save()
            res.status(201)
                .send({
                    status: "success",
                    message: "registration Successfully ",
                    Image: BlogImage_upload.secure_url,
                })
        } catch (err) {
            console.log(err);
        }
    }

    static BlogView = async (req, res) => {
        try {
            const Viewdata = await BlogModel.findById(req.params.id)
            res.status(200).json({
                success: true,
                Viewdata
            })
        } catch (err) {
            console.log(err);
        }
    }

    static BlogUpdate = async (req, res) => {
        try {
            const data = await BlogModel.findById(req.params.id)
            const image_id = data.image.public_id
            // console.log(image_id)
            await cloudinary.uploader.destroy(image_id);

            const Blogimage = req.files.image
            //    console.log(imagefile)
            const BlogImage_upload = await cloudinary.uploader.upload(
                Blogimage.tempFilePath,
                {
                folder: "Blog_image",
                width: 400,
            })

            const update = await BlogModel.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                // image:image_upload.secure_url,
                image: {
                    public_id: BlogImage_upload.public_id,
                    url: BlogImage_upload.secure_url,
                },
                description: req.body.description

            })
            //saving data
            await update.save()
            res.status(201)
                .send({
                    status: "success",
                    message: "Update Successfully ",
                    Image: BlogImage_upload.secure_url,
                })

        } catch (err) {
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
            // res.redirect('/admin/blogs')
        }catch(err){
            console.log(err)
        }
    }


}
module.exports = BlogController