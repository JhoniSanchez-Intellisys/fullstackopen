const config = require("./utils/config.js");
require("./app.js");
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const peronsRoutes = require("./controllers/controller.js");
const middleware = require("./utils/middleware.js");
const logger = require("./utils/logger.js");

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan(":url :method :body"));
app.use(middleware.requestLogger)
app.use("/", peronsRoutes);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);



app.listen(config.PORT, () => {
 logger.info(`Server running on port ${config.PORT}`);
});
