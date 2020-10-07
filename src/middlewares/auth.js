const jwt   = require("../lib/jwt");
const Users = require("../models/users");

async function auth(request, response, next) {
  try {
    const { authorization } = request.headers;
    const decodedToken      = jwt.verify(authorization);
    const userModel         = await Users.findById(decodedToken.id);
          request.userModel = userModel;

    next();
  } catch (error) {
    response.status(403).json({
      success: false,
      error  : "Usuario no autorizado",
    });
  }
}

module.exports = { auth };
