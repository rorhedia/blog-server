const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  name: {
    type     : String,
    required : "El nombre es obligatorio",
    maxlength: 60,
    minlength: 2,
  },
  email: {
    type    : String,
    required : "El correo es obligatorio",
  },
  phone: {
    type     : String,
    required : "El número de teléfono es obligatorio",
    minlength: 8,
  },
  message: {
    type: String,
  },
  created: {
    type   : Date,
    default: Date.now,
  },
  country_id: {
    type    : mongoose.Types.ObjectId,
    ref     : "countries",
    required: true,
  }
});

module.exports = mongoose.model("comments", commentsSchema);