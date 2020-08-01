const fs = require('fs');
const csv = require('csvtojson');
const inputFile = './csv/module_1.csv';
const outputFile = './txt/results.txt';
const csvParameters = {
    headers: ['book', 'author', 'amount', 'price'],
    ignoreColumns: /(amount)/,
    checkType: true
};

const readFileIntoRAM = () =>
{
    csv(csvParameters)
    .on('error',(err) => {
        console.log(err)
    })
    .fromFile(inputFile)
    .then((jsonObj)=>{
        let str = jsonObj.map(rowObj => (JSON.stringify(rowObj))).join('\r\n');
        fs.writeFileSync(outputFile, str, (error) => {
            if (error) {
                console.log('error: ${error}');
            }
        })
        //console.log(JSON.stringify(jsonObj));
    })

}

const readFileIntoStream = () =>
{
    let readStream = fs.createReadStream(inputFile);
    csv(csvParameters)
    .on('error',(err) => {
        console.log(err)
    })
    .fromStream(readStream)
    .subscribe((jsonObj)=>{
       fs.createWriteStream(outputFile).write(jsonObj);
       // console.log(JSON.stringify(jsonObj));
    });
}

const readFileIntoStreamPipe = () =>
{
    fs.createReadStream(inputFile).pipe(csv(csvParameters)).pipe(fs.createWriteStream(outputFile));
}

//readFileIntoRAM(); 
//readFileIntoStream(); //doesn't work;
//readFileIntoStreamPipe();