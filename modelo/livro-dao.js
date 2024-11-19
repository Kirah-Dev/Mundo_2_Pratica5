const { criarSchema } = require("./livro-schema");
let Livro; // Declaração global, para que seja acessada por todas as funções

const obterLivros = async () => {
  try {
    const schema = await criarSchema();
    Livro = mongoose.model("livros", schema); // Define o modelo aqui
    if (!Livro) {
      throw new Error("Falha ao criar o schema.");
    }
    const livros = await Livro.find();
    return livros;
  } catch (error) {
    console.error("Erro ao obter livros:", error);
    throw error;
  }
};

const incluir = async (livro) => {
  try {
    if (!Livro) {
      throw new Error("Modelo Livro não inicializado.");
    }
    const novoLivro = new Livro(livro);
    const livroSalvo = await novoLivro.save();
    return livroSalvo;
  } catch (error) {
    console.error("Erro ao incluir livro:", error);
    throw error;
  }
};

const excluir = async (codigo) => {
  try {
    if (!Livro) {
      throw new Error("Modelo Livro não inicializado.");
    }
    const resultado = await Livro.deleteOne({ _id: codigo });
    if (resultado.deletedCount === 0) {
      throw new Error("Livro não encontrado");
    }
    return resultado;
  } catch (error) {
    console.error("Erro ao excluir livro:", error);
    throw error;
  }
};

module.exports = { obterLivros, incluir, excluir };
