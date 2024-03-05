const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/modelblog.js");
const blogreutes = require("./controllers/blogcontrollers.js")
const middleware = require("./utils/middleware.js")
const { default: mongoose } = require("mongoose");
const config = require("./utils/config")
const usersRouter = require('./controllers/usercontroller.js')
const testingRouter = require('./controllers/testing.js')
const loginRouter = require('./controllers/logincontrollers.js')

//...

mongoose
.connect(config.MONGODB_URI)

.then((result) => {
  console.log("connected to MongoDB", config.PORT);
})
.catch((error) => {
  console.log("error connecting to MongoDB:", error.message);
});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger)
app.use("/", blogreutes)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'test') {
  console.log("Funcion test")
  app.use('/api/testing', testingRouter)
  
}

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