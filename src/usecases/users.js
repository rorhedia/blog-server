
const Users  = require("../models/users");
const bcrypt = require("../lib/bcrypt");
const jwt    = require("../lib/jwt");

const signup = async (userData) => {
  const { password }   = userData;
  const paswdEncripted = await bcrypt.hash(password);

  return Users.create({
    ...userData,
    password: paswdEncripted,
  });
};

const login = async (email, password) => {
  const userByEmail = await Users.findOne({ email });
  if (!userByEmail) throw new Error("Usuario o contraseña inválidos");

  const passwdIsValid = await bcrypt.compare(password, userByEmail.password);

  if (!passwdIsValid) throw new Error("Usuario o contraseña inválidos");

  return jwt.sign({ id: userByEmail._id });
};

module.exports = {
  signup,
  login,
};