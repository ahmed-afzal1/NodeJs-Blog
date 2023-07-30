const express = require('express');
const router = express.Router();
const { index, postDetails, postSearch, about, contact } = require('../controller/FrontController')

router.get('/', index)
router.get('/post/:id', postDetails)
router.post('/search', postSearch)
router.get('/about', about)
router.get('/contact', contact)

module.exports = router;