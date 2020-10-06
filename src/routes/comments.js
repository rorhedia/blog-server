const express                    = require("express");
const router                     = express.Router();
const { getById, createComment } = require("../usecases/comments");

// Middlewares
const { commentsFormValidation } = require("../middlewares/form");
const { auth }                   = require("../middlewares/auth");

router.get("/:id", auth, async (request, response) => {
  try {
    const id              = request.params.id;
    const commentResponse = await getById(id);

    response.json({
      success: true,
      data   : commentResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

router.post("/", commentsFormValidation, async (request, response) => {
  try {
    const data            = request.body;
    const commentResponse = await createComment(data);

    response.json({
      success: true,
      data   : commentResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

module.exports = router;
