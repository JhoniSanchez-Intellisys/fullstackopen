const blogRouter = require("express").Router();
const Blog = require("../models/modelblog");

blogRouter.get("/api/blog", (request, response) => {
  Blog.find({})
    .then((notes) => {
      response.json(notes);
      console.log(notes);
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

blogRouter.post("/api/blog", (request, response, next) => {
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

  blog
    .save()
    .then((el) => {
      response.json(el);
    })
    .catch((error) => next(error));
});

module.exports = blogRouter;
