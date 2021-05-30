module.exports = {
  PORT: process.env.PORT || 3001,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING || 'mongodb+srv://bank:bank1234@cluster0.ycnml.mongodb.net/bankapi?retryWrites=true&w=majority',
};
