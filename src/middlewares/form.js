
const {
  emailIsValid,
  nameIsValid,
  passwordSizeIsValid,
  phoneSizeIsValid,
  isNumber,
} = require("../lib/validations");

function formUserValidation(request, response, next) {
  try {
    const { name, email, password } = request.body;

    if (name.length < 1 || email.length < 1 || password.length < 1)
      throw new Error("Todos los campos son obligatorios");

    let emailResult = emailIsValid(email);
    if (!emailResult) throw new Error("Por favor ingresa un correo válido");

    let textResult = nameIsValid(name);
    if (!textResult) throw new Error("Solo se aceptan letras en el nombre");

    let passwordResult = passwordSizeIsValid(password);
    if (!passwordResult)
      throw new Error("El tamaño mínimo de la contraseña es de 8 dígitos");

    next();
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
}

function authValidation(request, response, next) {
  try {
    const { email, password } = request.body;

    if (email.length < 1 || password.length < 1)
      throw new Error("Todos los campos son obligatorios");

    let emailResult = emailIsValid(email);
    if (!emailResult) throw new Error("Por favor ingresa un correo válido");

    next();
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
}

function commentsFormValidation(request, response, next) {
  try {
    const { name, email, phone, message } = request.body;

    if (
      name.length < 1 ||
      email.length < 1 ||
      phone.length < 1 ||
      message.length < 1
    )
      throw new Error("Todos los campos son obligatorios");

    let nameResult = nameIsValid(name);
    if (!nameResult) throw new Error("Solo se aceptan letras en el nombre");

    let emailResult = emailIsValid(email);
    if (!emailResult) throw new Error("Por favor ingresa un correo válido");

    let phoneResult = phoneSizeIsValid(phone);
    if (!phoneResult) throw new Error("Por favor ingresa un teléfono válido");

    let phoneSizeResult = isNumber(phone);
    if (!phoneSizeResult)
      throw new Error("Por favor ingresa un teléfono válido");

    next();
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
}

module.exports = { formUserValidation, authValidation, commentsFormValidation };
