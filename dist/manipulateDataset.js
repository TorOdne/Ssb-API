"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createTable(dataset, parameters) {
    const sVArray = dataset.statistikkvariabel;
    const kommuneArray = dataset.kommune;
    const årArray = dataset.år;
    const data = dataset.data;
    const parameterSV = parameters.statistikkvariabler;
    const parameterKommuner = parameters.kommuner;
    let parameterÅr = parameters.år;
    const beregninger = ["median", "gjennomsnitt", "maksimum", "minimum"];
    if (parameterÅr.includes("median") === false) {
        for (let beregning of beregninger) {
            parameterÅr.push(beregning);
        }
    }
    // Determine indices of labels to include
    const sVIndex = getIndex(sVArray, parameterSV);
    const kommuneIndex = getIndex(kommuneArray, parameterKommuner);
    const årIndex = getIndex(årArray, parameterÅr);
    // Create new data array
    const newData = [];
    // pusher tomme arrays og fyller med data til slutt
    for (let i = 0; i < kommuneIndex.length; i++) {
        newData.push([]);
        for (let j = 0; j < sVIndex.length; j++) {
            newData[i].push([]);
            for (let k = 0; k < (årIndex.length - 4); k++) {
                newData[i][j].push([data[kommuneIndex[i]][sVIndex[j]][årIndex[k]]]);
            }
        }
    }
    const newDataset = {
        år: parameterÅr,
        kommune: parameterKommuner,
        statistikkvariabel: parameterSV,
        data: newData
    };
    for (let i = 0; i < newDataset.data.length; i++) {
        for (let j = 0; j < newDataset.data[i].length; j++) {
            let sum = 0;
            let median = 0;
            let gjennomsnitt = 0;
            let maks = 0;
            let min = null;
            for (let k = 0; k < newDataset.data[i][j].length; k++) {
                sum = +sum + +newDataset.data[i][j][k];
            }
            for (let k = 0; k < newDataset.data[i][j].length; k++) {
                if (newDataset.data[i][j][k] > maks) {
                    maks = newDataset.data[i][j][k];
                }
            }
            for (let k = 0; k < newDataset.data[i][j].length; k++) {
                if (min === null) {
                    min = newDataset.data[i][j][k];
                }
                else if (newDataset.data[i][j][k] < min) {
                    min = newDataset.data[i][j][k];
                }
            }
            median = newDataset.data[i][j][Math.floor((newDataset.år.length - 4) / 2)];
            gjennomsnitt = Math.round((sum / (newDataset.år.length - 4)));
            newDataset.data[i][j].push(median);
            newDataset.data[i][j].push(gjennomsnitt);
            newDataset.data[i][j].push(maks);
            newDataset.data[i][j].push(min);
        }
    }
    return newDataset;
}
exports.default = createTable;
function getIndex(array, labels) {
    return labels.map(label => array.indexOf(label));
}
