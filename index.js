require("dotenv").config();
require("./src/config/config");

const dbConnect = require("./src/lib/conn");
const server    = require("./src/server");

dbConnect()
  .then(() => {
    server.listen(process.env.PORT);
    console.log("DB Connect - Server is listening");
  })
  .catch((err) => {
    console.log(err.message);
  });