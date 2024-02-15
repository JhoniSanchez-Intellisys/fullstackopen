const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/modelblog.js");
const blogreutes = require("./controllers/blogcontrollers.js")
const middleware = require("./utils/middleware.js")
require("./app.js");

app.use(cors());
app.use(express.json());
app.use("/", blogreutes)
app.use(middleware.errorHandler);
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint);

const blog = new Blog({
  title: "Casa",
  author: "Jhoni",
  url: "http...../////////",
  likes: 200,
});

blog
  .save()
  .then((el) => {
    console.log(el)
  })
  .catch((error) => console.log(error));

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
