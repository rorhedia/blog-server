
const Countries = require("../models/countries");

const getAll = async () => await Countries.find();

const create = async (data) => await Countries.create(data);

module.exports = { getAll, create };