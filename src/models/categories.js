const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categoriesSchema = new mongoose.Schema({
  name: {
    type     : String,
    required : "Por favor agrega una categoría",
    maxlength: 60,
    minlength: 2,
    trim     : true,
    unique   : true,
  }
});

categoriesSchema.plugin(uniqueValidator, {
  message: "La categoría ya existe",
});

module.exports = mongoose.model("categories", categoriesSchema);