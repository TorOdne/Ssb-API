"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeDataset(årArray, kommuneArray, datapunktArray, kommuner, datapunktene_rad, tid_kol, jsonData) {
    let nyttDatasett = {
        år: årArray,
        kommune: kommuneArray,
        statistikkvariabel: datapunktArray,
        data: []
    };
    for (let i = 0; i < kommuner; i++) {
        nyttDatasett.data[i] = [];
        for (let j = 0; j < datapunktene_rad; j++) {
            nyttDatasett.data[i][j] = [];
            for (let k = 0; k < tid_kol; k++) {
                nyttDatasett.data[i][j][k] = [jsonData.splice(0, 1)[0]];
            }
        }
    }
    return nyttDatasett;
}
exports.default = makeDataset;
