const express = require("express");
const app = express();
const PORT = 8000;

const drinks = {
  "earl grey": {
    type: "tea",
    subtype: "black",
    content: 75,
    measurement: "bag",
  },

  black: {
    type: "tea",
    subtype: "black",
    content: 75,
    measurement: "bag",
  },

  unknown: {
    type: "unknown",
    subtype: "unknown",
    content: 0,
    measurement: "unknown",
  },
};

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/api/:name", (request, response) => {
  const drinkName = request.params.name.toLowerCase();
  if (drinks[drinkName]) {
    response.json(drinks[drinkName]);
  } else {
    response.json(drinks["unknown"]);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is now running on ${PORT}.  Better go catch it!`);
});
