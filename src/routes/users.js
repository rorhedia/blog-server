const express = require("express");
const router = express.Router();
const { signup, login } = require("../usecases/users");

// Middlewares
const { formUserValidation, authValidation } = require("../middlewares/form");

router.post("/sign-up", formUserValidation, async (request, response) => {
  try {
    const userResponse = await signup(request.body);

    response.json({
      success: true,
      data: userResponse,
    });
  } catch (error) {
    response.status(400);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/sign-in", authValidation, async (request, response) => {
  try {
    const { password, email } = request.body;
    const token = await login(email, password);
    response.json({
      success: true,
      data: {
        token,
      },
    });
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
