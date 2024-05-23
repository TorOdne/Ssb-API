import { sortedDataset } from "./Types";

export default function makeDataset(årArray: string[], kommuneArray: string[], 
    datapunktArray: string[], kommuner: number, datapunktene_rad: number, 
    tid_kol: number, jsonData: any) 
    {
        let nyttDatasett: sortedDataset = {
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