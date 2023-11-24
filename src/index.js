const csvReader = require('./libs/csv-reader');
const {Client} = require('@elastic/elasticsearch');

async function main() {
    const client = new Client({
        node: 'http://localhost:9200',
    });

    client.diagnostic.on('response',
        (err, result) => {
        if (err) {
            console.error(err)
        } else {
            console.info(result)
        }
    })

    const records = csvReader();

    try {
        await client.index({
            index: 'my-keyword',
            document: {
                "keyword": "펩시콜라",

            },
        })
    } catch (e) {
        console.error(e);
    }


}

main();
