const mongoose        = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const countriesSchema = new mongoose.Schema({
  name: {
    type     : String,
    required : "Por favor agrega un país",
    maxlength: 60,
    minlength: 2,
    trim     : true,
    unique   : true
  },
  active: {
    type   : Boolean,
    default: true
  }
});

countriesSchema.plugin(uniqueValidator, {
  message: "El país agregado ya existe",
});

module.exports = mongoose.model("countries", countriesSchema);