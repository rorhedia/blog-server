
const express          = require("express");
const router           = express.Router();
const {getAll, create} = require('../usecases/categories');

// Middlewares
const {auth} = require("../middlewares/auth");

router.get("/", async (request, response) => {
  try {
    const categoriesResponse = await getAll();

    response.json({
      success: true,
      data: categoriesResponse,
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
    const categoriesResponse = await create(request.body);

    response.json({
      success: true,
      data: categoriesResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;