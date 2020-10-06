const Entities = require("html-entities").AllHtmlEntities;

const entities = new Entities();

const emailIsValid = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
};

const nameIsValid = (text) => {
  const regex = /^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/;

  return regex.test(text);
};

const passwordSizeIsValid = (password) => {
  const size = password.length;

  if (size < 8) return false;

  return true;
};

const phoneSizeIsValid = (phone) => {
  const size = phone.length;

  if (size < 8) return false;

  return true;
};

const isNumber = (data) => {
  const regex = /^\d+$/;

  return regex.test(data);
};

const encode = (data) => entities.encode(data);

const decode = (data) => entities.decode(data);

module.exports = {
  emailIsValid,
  nameIsValid,
  passwordSizeIsValid,
  encode,
  decode,
  phoneSizeIsValid,
  isNumber,
};
