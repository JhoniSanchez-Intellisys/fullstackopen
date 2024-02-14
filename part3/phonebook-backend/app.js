
const { default: mongoose } = require("mongoose");
const config = require("./utils/config")
mongoose.set("strictQuery", false);
// console.log('connecting to', url)

mongoose
  .connect(config.MONGODB_URI)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

