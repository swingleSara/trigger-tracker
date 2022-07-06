const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const { MongoClient } = require("mongodb").MongoClient;
require("dotenv").config();

let db;
let dbConnectionStr = process.env.DB_STRING;
let dbName = "cluster0";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  db.collection("drinks")
    .find()
    .sort({ units: -1 })
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addDrink", (request, response) => {
  db.collection("drinks")
    .insertOne({
      name: request.body.name,
      type: request.body.type,
      subtype: request.body.subtype,
      content: request.body.content,
      measurement: request.body.measurement,
      units: 0,
    })
    .then((result) => {
      console.log("Drink added");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addOneUnit", (request, response) => {
  db.collection("drinks")
    .updateOne(
      {
        name: request.body.nameS,
        type: request.body.typeS,
        subtype: request.body.subtypeS,
        content: request.body.contentS,
        measurement: request.body.measurementS,
        units: request.body.unitsS,
      },
      {
        $set: {
          units: request.body.unitsS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added one unit");
      response.json("Unit added");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteDrink", (request, response) => {
  db.collection("drinks")
    .deleteOne({ name: request.body.nameS })
    .then((result) => {
      console.log("Drink deleted");
      response.json("Drink deleted");
    })
    .catch((error) => console.error(error));
});
