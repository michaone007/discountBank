const server = require("./server.js"),
  { PORT } = require("./server.config"),
  looger = require("./src/loaders/looger");

server.listen(PORT, () => {
  looger.info(`Server has started - port ${PORT}`);
});
