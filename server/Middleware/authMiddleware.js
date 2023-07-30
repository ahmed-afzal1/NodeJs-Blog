const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

const adminLayout = '../views/layouts/admin.ejs';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    const locals = {
        title: "Login Page",
        description: "This is the description"
    }

    if(!token) {
        res.redirect('/admin/login');
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        req.userId = decoded.userId;
        next();
    } catch(error) {
        res.redirect('/admin/login');
    }
}

module.exports = authMiddleware;