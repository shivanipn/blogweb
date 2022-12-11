const express = require('express')
const { BlogInsert } = require('../controller/api/BlogController')
const BlogController = require('../controller/api/BlogController')
const UsersController = require('../controller/api/UsersController')
const CheckUserAuth = require('../middleware/auth')
const router = express.Router()

router.get('/blogs',BlogController.Blogs)
router.post('/bloginsert',BlogController.BlogInsert)
router.get('/blogview/:id',BlogController.BlogView)
router.post('/blogupdate/:id',BlogController.BlogUpdate)
router.get('/blogdelete/:id',BlogController.BlogDelete)

//UsersController
router.post('/register',UsersController.Register)
router.post('/verifylogin',CheckUserAuth,UsersController.VerifyLogin)
router.get('/logout',UsersController.Logout)

module.exports = router;