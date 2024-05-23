import path from "path"
import express, {Request, Response } from "express";
import makeDataset from "./makeDataset";
import manipulateDataset from "./manipulateDataset"
import { options, sortedDataset } from "./Types";

const app = require("express")();
const PORT = 8080;

let dataset: sortedDataset;

app.use(express.json());
app.use(express.static('public/css'));

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

app.post("/datasets", (req: any, res: any) => {
  const data = req.body[0]
  const sortedDataset = makeDataset(data.tidDimension, data.regionDimension, 
    data.contentsCodeDimension, data.regionDimension.length, 
    data.contentsCodeDimension.length, data.tidDimension.length,
    data.dataset.value
  )

  dataset = sortedDataset;
  res.send(sortedDataset);
})

app.post("/parameters", (req: any, res: any) => {
  const parameters: options = req.body;
  res.send(manipulateDataset(dataset, parameters));
})



app.listen(
    PORT,
    () => console.log(`server up on http://localhost:${PORT}`)
)
