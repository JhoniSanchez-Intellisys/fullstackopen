const blogRouter = require("express").Router();
const Blog = require("../models/modelblog");

const User = require("../models/modelsUsers");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogRouter.get("/api/blog", async (request, response) => {
  try {
    const blogs = await Blog.find({})
    
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/api/blog/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findById(request.params.id);
    const usuario = await User.findById(blogs.userId);
    const nombre = usuario.username;
blogs.User = nombre

    console.log(blogs, nombre)

    response.json(blogs);
    
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/api/blog/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findByIdAndDelete(request.params.id);
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

// blogRouter.get("/api/blog", (request, response) => {
//   Blog.find({})
//     .then((notes) => {
//       response.json(notes);
//       console.log(notes);
//     })
//     .catch((error) => {
//       console.log(error);
//       response.status(500).end();
//     });
// });

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRouter.post("/api/blog", async (request, response, next) => {
  const {
    title,
    author,
    url,
    likes,
    //  userId
  } = request.body;
  if (!title || !author || !url || !likes) {
    return response.status(400).json({
      error: "Params missing",
    });
  }

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  try {
    // const user = await User.findById(userId);
    // console.log("usuario buscado", user);
    const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      userId: user.id,
    });

    // const user = await User.findById(userId)
    const blogSaved = await blog.save();
    // console.log(blogSaved.id);
    user.blogs = user.blogs.concat(blogSaved.id);
    await user.save();
    response.status(201).json(blogSaved);
  } catch (error) {
    next(error);
  }
});
blogRouter.put("/api/blog/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !author || !url || !likes) {
    return response.status(400).json({
      error: "Params missing",
    });
  }

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
  };
  try {
    const update = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.status(200).json(update);
  } catch (error) {
    (error) => next(error);
  }
});

module.exports = blogRouter;
