const models = require("../models")(),
  looger = require("./looger"),


module.exports = async (app) => {
  require("./expressLoader")(app);
  looger.info("Express loaded!");


  // catch Uncaught error logging them
  require("./logging")();
};
