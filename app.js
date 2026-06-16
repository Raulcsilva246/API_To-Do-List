const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, "BD.json");

async function lerBanco() {
  return await fs.readJson(DB_PATH);
}

async function salvarBanco(dados) {
  await fs.writeJson(DB_PATH, dados, { spaces: 2 });
}

// Buscar todas as tarefas
app.get("/tarefas", async (req, res) => {
  const banco = await lerBanco();

  console.log(
    JSON.stringify(banco, null, 2)
  );

  res.json(banco.tarefas);
});

// Criar tarefa
app.post("/tarefas", async (req, res) => {
    
      console.log("POST /tarefas");
  console.log(req.body);
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({
      erro: "Título obrigatório",
    });
  }

  const banco = await lerBanco();

  const novaTarefa = {
    id: Date.now(),
    titulo,
    concluida: false,
  };

  banco.tarefas.push(novaTarefa);

  await salvarBanco(banco);

  res.status(201).json(novaTarefa);
});

// Alternar status
app.put("/tarefas/:id", async (req, res) => {
  const id = Number(req.params.id);

  const banco = await lerBanco();

  const tarefa = banco.tarefas.find(
    (item) => item.id === id
  );

  if (!tarefa) {
    return res.status(404).json({
      erro: "Tarefa não encontrada",
    });
  }

  tarefa.concluida = !tarefa.concluida;

  await salvarBanco(banco);

  res.json(tarefa);
});

// Excluir tarefa
app.delete("/tarefas/:id", async (req, res) => {
  const id = Number(req.params.id);

  const banco = await lerBanco();

  banco.tarefas = banco.tarefas.filter(
    (item) => item.id !== id
  );

  await salvarBanco(banco);

  res.json({
    mensagem: "Tarefa removida",
  });
});

// Encerrar dia
app.post("/encerrar-dia", async (req, res) => {
  await salvarBanco({
    tarefas: [],
  });

  res.json({
    mensagem: "Dia encerrado",
  });
});

module.exports = app;