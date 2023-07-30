
const Post = require('../Models/Post');
const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const adminLayout = '../views/layouts/admin.ejs';
const jwtSecret = process.env.JWT_SECRET;
  

async function login(req, res, next){
    const locals = {
        title: "Login Page",
        description: "This is the description"
    }

    res.render('admin/login',{
        locals,
        layout: adminLayout
    })
}

async function loginSubmit(req, res, next){
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });

        if(!user){
            return res.status(401).json( { message: 'Invalid credentials' } );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
          return res.status(401).json( { message: 'Invalid credentials' } );
        }

        const token = jwt.sign({ userId: user._id}, jwtSecret );
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/admin/dashboard');

    } catch (error) {
        
    }
}

async function register(req, res, next){
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User created', user})
        } catch (error) {
            if(error.code === 11000) {
                res.status(409).json({ message: 'User already in use'});
            }
            res.status(500).json({ message: 'Internal server error'})
        }


    } catch (error) {
        
    }

}

async function dashboard(req, res, next){
    try {
        const locals = {
            title: 'Dashboard',
            description: 'Simple Blog created with NodeJs, Express & MongoDb.'
        }

        const data = await Post.find();

        res.render('admin/dashboard',{
            locals,
            data,
            layout: adminLayout
        })
    } catch (error) {
        
    }
}

module.exports = {
    login,
    loginSubmit,
    register,
    dashboard
}