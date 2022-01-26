const express = require("express");
const app = express();
const port = 8081;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/:file", (req, res) => {
  const json = require("../server/json/input.json");
  res.header("Content-Type", "application/json");
  res.send(json);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
