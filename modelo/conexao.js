const mongoose = require("mongoose");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const conectar = async () => {
  console.log("Tentando conectar ao MongoDB...");
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/livraria",
      options
    );
    console.log("Conectado ao MongoDB com sucesso!");
    return conn;
  } catch (error) {
    console.error("Erro crítico ao conectar ao MongoDB:", error);
    throw error;
  }
};

module.exports = { conectar };
