# API To-Do List

API REST simples para gerenciamento de tarefas (to-do list), construída com Node.js e Express. Permite criar, listar, concluir e excluir tarefas, usando o [JSONBin.io](https://jsonbin.io/) como banco de dados remoto (armazenamento em JSON na nuvem, sem necessidade de configurar um banco de dados tradicional).

O projeto foi criado como uma API back-end para servir de base a aplicações de lista de tarefas (web, mobile ou desktop) que precisem de um servidor simples para persistir e sincronizar dados.

Projeto em desenvolvimento / estudo.

## Funcionalidades

- Listar todas as tarefas cadastradas
- Criar uma nova tarefa
- Alternar o status de uma tarefa (concluída / não concluída)
- Excluir uma tarefa
- Encerrar o dia (limpa todas as tarefas da lista)

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/) `^5.2.1` — framework para criação da API
- [Axios](https://axios-http.com/) — requisições HTTP para o JSONBin.io
- [CORS](https://www.npmjs.com/package/cors) — liberação de acesso entre origens diferentes
- [Dotenv](https://www.npmjs.com/package/dotenv) — variáveis de ambiente
- [fs-extra](https://www.npmjs.com/package/fs-extra) — utilitários de sistema de arquivos
- [JSONBin.io](https://jsonbin.io/) — armazenamento remoto dos dados em formato JSON

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
- Uma conta gratuita no [JSONBin.io](https://jsonbin.io/), para gerar sua própria API Key e criar um Bin (o "banco de dados" das tarefas)

## Instalação e execução

```bash
# Clone o repositório
git clone https://github.com/Raulcsilva246/API_To-Do-List.git

# Acesse a pasta do projeto
cd API_To-Do-List

# Instale as dependências
npm install
```

### Configuração das variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
JSONBIN_BIN_ID=SEU_BIN_ID_AQUI
JSONBIN_API_KEY=SUA_API_KEY_AQUI
PORT=3000
```

- `JSONBIN_BIN_ID`: ID do Bin criado na sua conta do JSONBin.io (deve conter inicialmente `{ "tarefas": [] }`)
- `JSONBIN_API_KEY`: sua chave de acesso (Master Key) do JSONBin.io
- `PORT`: porta em que o servidor vai rodar (opcional, padrão `3000`)

Nunca suba o arquivo `.env` com suas chaves reais para um repositório público. Mantenha-o listado no `.gitignore`.

### Rodando o servidor

```bash
npm start
```

O servidor iniciará em `http://localhost:3000` (ou na porta definida em `PORT`).

## Como usar (rotas da API)

| Método | Rota | Descrição | Corpo da requisição |
|---|---|---|---|
| `GET` | `/tarefas` | Lista todas as tarefas | — |
| `POST` | `/tarefas` | Cria uma nova tarefa | `{ "titulo": "Nome da tarefa" }` |
| `PUT` | `/tarefas/:id` | Alterna o status (concluída/pendente) de uma tarefa | — |
| `DELETE` | `/tarefas/:id` | Remove uma tarefa | — |
| `POST` | `/encerrar-dia` | Remove todas as tarefas da lista | — |

### Exemplos

Criar uma tarefa
```bash
curl -X POST http://localhost:3000/tarefas \
  -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar Node.js"}'
```

Listar tarefas
```bash
curl http://localhost:3000/tarefas
```

Concluir/reabrir uma tarefa
```bash
curl -X PUT http://localhost:3000/tarefas/1699999999999
```

Excluir uma tarefa
```bash
curl -X DELETE http://localhost:3000/tarefas/1699999999999
```

Encerrar o dia (limpar a lista)
```bash
curl -X POST http://localhost:3000/encerrar-dia
```

## Licença

Este projeto está licenciado sob os termos definidos no `package.json` (ISC). Caso deseje reutilizar o código, considere adicionar um arquivo `LICENSE` formal ao repositório.

## Autor

Raul C. Silva
GitHub: [@Raulcsilva246](https://github.com/Raulcsilva246)
