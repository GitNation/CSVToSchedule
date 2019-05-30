const fileName = './main.csv';

const parse = require('csv-parse')
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);

async function readAndParse(file) {
    const label = `read1-${file}`;
    const data = await readFile(file, 'utf8');

    parse(data, {
        comment: '#'
    }, function (err, output) {

        const talks = output.map(csvLine => {
            const talk = {};
            talk['time'] = csvLine[0];
            talk['name'] = csvLine[1].split('-')[0];
            talk['title'] = csvLine[1].split('-')[1] || '';

            talk['name'] = talk['name'].trim();
            talk['title'] = talk['title'].trim();

            return talk;
        })

        console.log(talks);
    })
}

readAndParse(fileName);