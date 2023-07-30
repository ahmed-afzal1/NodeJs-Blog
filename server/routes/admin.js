const express = require('express');
const router = express.Router();
const { login, loginSubmit, register, dashboard } = require('../controller/AdminController')
const { create, store, edit, update, destroy } = require('../controller/PostController')
const authMiddleware = require('../Middleware/authMiddleware') 

const adminLayout = '../views/layouts/admin.ejs';   


router.get('/login', login);
router.post('/login', loginSubmit)
router.post('/register', register)
router.get('/dashboard', authMiddleware, dashboard);

router.use('/post', authMiddleware);

router.get('/post/create', create)
router.post('/post/store', store)
router.get('/post/edit/:id', edit)
router.post('/post/update/:id', update)
router.post('/post/delete/:id', destroy)


module.exports = router;