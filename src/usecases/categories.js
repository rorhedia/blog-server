
const Categories = require("../models/categories");

const getAll = async () => await Categories.find();

const create = async (data) => await Categories.create(data);

module.exports = { getAll, create };