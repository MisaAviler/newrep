const convertExcel = require('excel-as-json').processFile;
const fs = require('fs');

const inputFile = process.env.INPUT || 'markers.xlsx';
const outputFile = process.env.OUTPUT || 'markers.js';
const config = {
    sheet:'1',
    isColOriented: false,
    omitEmtpyFields: true
};

const formatData = (err, data) => {
    const features = data.map(item => new Marker(item));
    const type = "FeatureCollection";

    fs.writeFile(outputFile, JSON.stringify({type, features}), () => console.log(err));
};

class Marker {
    constructor({latitude, longitude, name, address, city, zip}) {
        this.type = 'Feature';
        this.geometry = {type : 'Point', coordinates : [latitude, longitude]};
        this.properties = {name, address, city, zip};
    }
};

convertExcel(inputFile, null, config, formatData);

