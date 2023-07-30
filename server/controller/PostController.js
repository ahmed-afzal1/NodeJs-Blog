const Post = require('../Models/Post');

const adminLayout = '../views/layouts/admin.ejs';

async function create(req, res, next){
    try {
        const locals = {
            title: 'Add Post',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }

        res.render('admin/post/create', {
            locals,
            layout: adminLayout
        })

    } catch (error) {
        console.log(error);
    }
}

async function store(req, res, next){
    try {
        const data = new Post({
            title: req.body.title,
            body: req.body.body
        })

        Post.create(data);
        res.redirect('/admin/dashboard');

    } catch (error) {
        console.log(error)
    }
}

async function edit(req, res, next){
    try {
        const locals = {
            title: 'Edit Post',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }

        const data = await Post.findOne({ _id: req.params.id })

        res.render('admin/post/edit',{
            locals,
            data,
            layout: adminLayout
        })
    } catch (error) {
        console.log(error)
    }
}


async function update(req, res, next){
    try {
        await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        })

        res.redirect('/admin/dashboard');
    } catch (error) {
        console.log(error)
    }
}


async function destroy(req, res, next){
    try {
        await Post.deleteOne( { _id: req.params.id } );
        res.redirect('/admin/dashboard');
    } catch (error) {
    console.log(error);
    }
}




module.exports = {
    create,
    store,
    edit,
    update,
    destroy,
}