const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/modelblog.js");
const blogreutes = require("./controllers/blogcontrollers.js")
const middleware = require("./utils/middleware.js")
const { default: mongoose } = require("mongoose");
const config = require("./utils/config")
const usersRouter = require('./controllers/usercontroller.js')


mongoose
  .connect(config.MONGODB_URI)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

  app.use(cors());
  app.use(express.json());
  app.use(middleware.requestLogger)
  app.use("/", blogreutes)
  app.use('/api/users', usersRouter)
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);


// const blog = new Blog({
//   title: "Casa",
//   author: "Jhoni",
//   url: "http...../////////",
//   likes: 200,
// });

// blog
//   .save()
//   .then((el) => {
//     console.log(el)
//   })
//   .catch((error) => console.log(error));


module.exports = app