const blogRouter = require("express").Router();
const Blog = require("../models/modelblog");

blogRouter.get("/api/blog", async (request, response) => {
  try {
    const blogs = await Blog.find({});
  response.json(blogs);
  } catch (error) {
        next(error);

  }
  
});

blogRouter.get("/api/blog/:id", async (request, response, next) => {
  try {
    const blogs = await Blog.findById(request.params.id);
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

blogRouter.post("/api/blog", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title || !author || !url || !likes) {
    return response.status(400).json({
      error: "Params missing",
    });
  }
  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });
  try {
    const blogSaved = await blog.save();
    response.status(201).json(blogSaved);
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
