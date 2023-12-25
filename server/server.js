import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import datasetRoute from "./Routes/dataset.route.js";
import Dataset from "./Models/Dataset.js";
configDotenv();

const app = express();
const port = 9000;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then((res) => {
    console.log(res.connections[0].name);
  })
  .catch((err) => console.log("error occured.", err));

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/api/v1", datasetRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
