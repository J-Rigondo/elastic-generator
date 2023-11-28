const csvParse = require("csv-parse");
const iconv = require("iconv-lite");
const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { bulkInsert } = require("../utils");
const { customKeywordList } = require("../data");
const filePath = "C:\\Users\\User\\Downloads\\px_rank_item_list.csv";
function csvReadBulkInsert(client) {
  const records = [];

  const parser = csvParse.parse({
    columns: true,
    delimiter: ",",
  });
  parser.on("readable", function () {
    let record;
    while ((record = parser.read()) !== null) {
      records.push(record);
    }
  });
  parser.on("error", function (err) {
    console.error(err.message);
  });
  parser.on("end", function () {});

  fs.createReadStream(filePath)
    .pipe(iconv.decodeStream("euc-kr"))
    .pipe(parser)
    .on("end", () => {
      const data = records
        .filter((record) => record["선정기준"] === "수량")
        .map((record) => record["상품명"]);

      const uniqueArray = [...new Set(data), ...customKeywordList];

      console.log(uniqueArray.length);

      const dataset = uniqueArray.map((record) => ({
        searchKeyword: record,
        searchCount: faker.number.int({ min: 100, max: 3000 }),
        exposeAvg: faker.number.int({ min: 10, max: 70 }),
        clickAvg: faker.number.int({ min: 1, max: 10 }),
        clickRate: faker.number.int({ min: 10, max: 99 }),
      }));

      bulkInsert({ client, indexName: "keyword-index", dataset });
    });
}

module.exports = csvReadBulkInsert;
