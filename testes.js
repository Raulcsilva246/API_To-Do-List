const { lerBanco } = require("./jsonbin");

async function teste() {
  const banco = await lerBanco();

  console.log(banco);
}

teste();