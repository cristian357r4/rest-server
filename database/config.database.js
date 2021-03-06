const mongoose = require("mongoose");

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.MONGO_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    }catch (error) {
        throw new Error('Error al conectar a la base de datos ' + error);
    }
};

module.exports = dbConnection;