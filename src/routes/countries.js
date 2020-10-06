
const express          = require("express");
const router           = express.Router();
const {getAll, create} = require('../usecases/countries');

// Middlewares
const {auth} = require("../middlewares/auth");

router.get("/", async (request, response) => {
  try {
    const countriesResponse = await getAll();

    response.json({
      success: true,
      data: countriesResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/", auth, async (request, response) => {
  try {
    console.log(request.body);
    const countriesResponse = await create(request.body);

    response.json({
      success: true,
      data: countriesResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;