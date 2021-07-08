const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB Conectada.');
  } catch (error) {
    console.log('Log:', error);
    throw new Error('Error al inicializar la base de datos');
  }
};
module.exports = {
  dbConnection,
};