const express = require('express')
const CheckUserAuth = require('../middleware/auth')  
const router = express.Router()    //Router method hai
const AdminController = require('../controller/Admin/AdminController')
const FrontendController = require('../controller/FrontendController')
const CategoryController = require('../controller/Admin/CategoryController')
const UserController = require('../controller/UserController')

//FrontendController
router.get('/', FrontendController.home)
router.get('/about', FrontendController.about)
router.get('/contact', FrontendController.contact)
router.get('/bloglist', FrontendController.bloglist)
router.get('/blogdetail/:id', FrontendController.blogdetail)
router.get('/login', FrontendController.login)


//admin controller
router.get('/admin/dashboard', CheckUserAuth,AdminController.dashboard)
router.get('/admin/dashboard',CheckUserAuth, AdminController.dashboard)
router.get('/admin/blogs', CheckUserAuth,AdminController.Blogs)
router.get('/admin/addblogs',CheckUserAuth, AdminController.Addblogs)
router.post('/admin/insert_blog',CheckUserAuth, AdminController.insertblog)
router.get('/admin/blog_view/:id',CheckUserAuth, AdminController.BlogView)
router.get('/admin/blog_edit/:id',CheckUserAuth, AdminController.BlogEdit)
router.post('/admin/blog_update/:id',CheckUserAuth, AdminController.BlogUpdate)
router.get('/admin/blog_delete/:id',CheckUserAuth, AdminController.BlogDelete)


// Admin/categoryController
router.get('/admin/category',CheckUserAuth, CategoryController.CategoryDisplay)
router.get('/admin/createcategory',CheckUserAuth, CategoryController.CreateCategory)
router.post('/admin/category_insert',CheckUserAuth, CategoryController.CategoryInsert)
router.get('/admin/category_view/:id',CheckUserAuth, CategoryController.CategoryView)
router.get('/admin/category_edit/:id',CheckUserAuth, CategoryController.CategoryEdit)
router.post('/admin/category_update/:id',CheckUserAuth,CategoryController.CategoryUpdate)
router.get('/admin/category_delete/:id',CheckUserAuth, CategoryController.CategoryDelete)

//UserController
router.get('/admin/register',UserController.AdminRegister)
router.post('/register',UserController.Register)
router.post('/verify_login',UserController.VerifyLogin)
router.get('/logout',UserController.Logout)

module.exports = router

