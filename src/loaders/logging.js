/* eslint-disable no-undef */
const looger = require("./looger");

module.exports = () => {
  process
    .on("unhandledRejection", (reason) => {
      looger.error(`message:${reason.message || reason} stack:${reason.stack || null}`);
    })
    .on("uncaughtException", (err) => {
      looger.error(`message:${err.message || err} stack:${err.stack || null}`);
      //  / process.exit(1);
    });
  process.on("SIGINT", () => {
    process.exit();
  });
};
