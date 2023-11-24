const csvParse = require('csv-parse');
const iconv = require('iconv-lite');
const fs = require('fs');
const filePath ="C:\\Users\\User\\Downloads\\rank_item_list.csv";
function csvReader() {
    const records = [];

    const parser = csvParse.parse({
        columns:true,
        delimiter: ',',
    });
    parser.on('readable', function(){
        let record;
        while ((record = parser.read()) !== null) {
            records.push(record);
        }


    });
    parser.on('error', function(err){
        console.error(err.message);
    });
    parser.on('end', function(){
        console.log(records);
        return records;

    });

    fs.createReadStream(filePath)
        .pipe(iconv.decodeStream('euc-kr'))
        .pipe(parser);

}

module.exports = csvReader;
