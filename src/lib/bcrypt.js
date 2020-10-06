const bcrypt = require("bcrypt");
const salt   = 10;

const hash = (plainTex) => bcrypt.hash(plainTex, salt);

module.exports = {
  ...bcrypt,
  hash,
};
