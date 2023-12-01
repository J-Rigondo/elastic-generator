const crypto = require("crypto");
async function bulkInsert({ client, indexName, dataset }) {
  const operations = dataset.flatMap((doc) => [
    { index: { _index: indexName } },
    doc,
  ]);

  const bulkResponse = await client.bulk({ refresh: true, operations });

  console.log(bulkResponse);
}

function generateRandomKey(length) {
  const specialSymbol = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    const randomByte = crypto.randomBytes(1)[0];
    result += characters[randomByte % charactersLength];
  }
  return result;
}

module.exports = { bulkInsert, generateRandomKey };
