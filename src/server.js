const express = require("express");
const app     = express();
const cors    = require("cors");

app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
  res.send('hola')
})

module.exports = app;