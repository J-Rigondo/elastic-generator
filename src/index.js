const csvReadBulkInsert = require("./libs/csv-reader");
const { Client } = require("@elastic/elasticsearch");
const { bulkInsert, generateRandomKey } = require("./utils");
const { adList } = require("./data");

async function main() {
  // const client = new Client({
  //   node: "http://localhost:9200",
  // });
  //
  // client.diagnostic.on("response", (err, result) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.info(result);
  //   }
  // });

  // csvReadBulkInsert(client);

  // await bulkInsert({client, indexName:'ad-index',dataset:adList});

  console.log(generateRandomKey(32));
}

main();
