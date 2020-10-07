const mongoose        = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usersSchema = new mongoose.Schema({
  name: {
    type     : String,
    trim     : true,
    required : "El nombre es obligatorio",
    maxlength: 60,
    minlength: 2,
  },
  email: {
    type: String,
    required: "El correo es obligatorio",
    trim: true,
    unique: true,
    uniqueCaseInsensitive: true,
    match: [emailValidation, "Por favor ingresa un correo válido"],
  },
  password: {
    type     : String,
    required : "La contraseña es obligatoria",
    minlength: 8,
  },
  avatar: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

usersSchema.methods.toJSON = function () {
  let user       = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject.created;

  return userObject;
};

usersSchema.plugin(uniqueValidator, {
  message: "El usuario ya existe",
});

module.exports = mongoose.model("users", usersSchema);
