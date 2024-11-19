const express = require("express");
const router = express.Router();
const livroDAO = require("../modelo/livro-dao"); // Importação adicionada aqui
const { obterLivros, incluir, excluir } = require("../modelo/livro-dao");

// GET /livros
router.get("/", async (req, res) => {
  try {
    const livros = await livroDAO.obterLivros();
    res.json(livros);
  } catch (error) {
    console.error("Erro crítico ao obter livros:", error);
    res.status(500).json({
      error: "Erro interno do servidor. Por favor, tente novamente mais tarde.",
    });
  }
});

// POST /livros
router.post("/", async (req, res) => {
  try {
    const livro = await livroDAO.incluir(req.body); // Corrigido: livroDAO.incluir
    res.status(201).json({ mensagem: "Livro criado com sucesso", livro });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao criar livro" });
  }
});

// DELETE /livros/:id
router.delete("/:id", async (req, res) => {
  try {
    await livroDAO.excluir(req.params.id); // Corrigido: livroDAO.excluir
    res.status(204).send();
  } catch (error) {
    if (error.message === "Livro não encontrado") {
      res.status(404).json({ error: "Livro não encontrado" });
    } else {
      console.error("Erro:", error);
      res.status(500).json({ error: "Erro ao excluir livro" });
    }
  }
});

module.exports = router;
