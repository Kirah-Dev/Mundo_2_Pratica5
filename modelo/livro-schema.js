const { conectar } = require("./conexao");

const criarSchema = async () => {
  try {
    const conn = await conectar();
    const LivroSchema = new conn.Schema({
      _id: conn.Schema.Types.ObjectId,
      titulo: { type: String, required: true },
      codEditora: { type: Number, required: true },
      resumo: String,
      autores: [String],
    });
    return LivroSchema; // Retorna apenas o schema
  } catch (error) {
    console.error("Erro ao criar schema:", error);
    throw error;
  }
};

module.exports = { criarSchema };
