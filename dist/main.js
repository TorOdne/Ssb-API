"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const makeDataset_1 = __importDefault(require("./makeDataset"));
const manipulateDataset_1 = __importDefault(require("./manipulateDataset"));
const app = require("express")();
const PORT = 8080;
let dataset;
app.use(express_1.default.json());
app.use(express_1.default.static('public/css'));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/index.html'));
});
app.post("/datasets", (req, res) => {
    const data = req.body[0];
    const sortedDataset = (0, makeDataset_1.default)(data.tidDimension, data.regionDimension, data.contentsCodeDimension, data.regionDimension.length, data.contentsCodeDimension.length, data.tidDimension.length, data.dataset.value);
    dataset = sortedDataset;
    res.send(sortedDataset);
});
app.post("/parameters", (req, res) => {
    const parameters = req.body;
    res.send((0, manipulateDataset_1.default)(dataset, parameters));
});
app.listen(PORT, () => console.log(`server up on http://localhost:${PORT}`));
