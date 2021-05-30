const { createLogger, format, transports } = require("winston");


const options = {

  console: {
    level: "info",
    colorize: true,
    format: format.combine(format.cli(), format.splat())
  }
};
// instantiate a new Winston Logger with the settings defined above
var logger = createLogger({
  transports: [



    new transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

module.exports = logger;
