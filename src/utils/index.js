async function bulkInsert({client, indexName, dataset}) {
    const operations = dataset.flatMap(doc => [{ index: { _index: indexName } }, doc]);

    const bulkResponse = await client.bulk({ refresh: true, operations });

    console.log(bulkResponse);
}

module.exports = {bulkInsert}
