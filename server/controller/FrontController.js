const Post = require('../Models/Post')

async function index(req, res, next){
    const locals = {
        title: "NodeJS Blog",
        description: "This is the description"
    }

    let perPage = 2;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    
    try{
        const data = await Post.find();
        res.render('index',{ 
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null 
        })
    }catch(error){
        console.log(error)
    }
}

async function postDetails(req, res, next){
    try{
        let id = req.params.id;
        const data = await Post.findById({ _id: id });
    

        const locals = {
            title: data.title,
            description: "Simple Blog created with NodeJs, Express & MongoDb.",
        }

        console.log(data);

        res.render('post',{
            locals,
            data
        })
    }catch(error){
        console.log(error)
    }
}

async function postSearch(req, res, next){
    try{
        const locals = {
            title: "Seach",
            description: "Simple Blog created with NodeJs, Express & MongoDb."
        }
          
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
    
        const data = await Post.find({
          $or: [
            { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
            { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
          ]
        });

        res.render("search",{
            locals,
            data
        })
    }catch(error){
        console.log(error);
    }
}

async function about(req, res, next){
    res.render('about');
}

async function contact(req, res, next){
    res.render('contact');
}

module.exports = {
    index,
    postDetails,
    postSearch,
    about,
    contact
}