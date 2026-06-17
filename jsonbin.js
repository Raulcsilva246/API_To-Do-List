require("dotenv").config();
const axios = require("axios");

const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;

async function lerBanco() {
  const response = await axios.get(
    `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
    {
      headers: {
        "X-Master-Key": API_KEY,
      },
    }
  );

  return response.data.record;
}

async function salvarBanco(dados) {
  await axios.put(
    `https://api.jsonbin.io/v3/b/${BIN_ID}`,
    dados,
    {
      headers: {
        "X-Master-Key": API_KEY,
        "Content-Type": "application/json",
      },
    }
  );
}

module.exports = {
  lerBanco,
  salvarBanco,
};