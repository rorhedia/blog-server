
const express = require("express");
const router  = express.Router();
const {
  getAll,
  create,
  getPopulars,
  getByCategory,
  searchPosts,
} = require("../usecases/posts");

// Middlewares
const { auth } = require("../middlewares/auth");

router.get("/", async (request, response) => {
  try {
    const postsResponse = await getAll();

    response.json({
      success: true,
      data   : postsResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

router.get("/populars", async (request, response) => {
  try {
    const postsResponse = await getPopulars();

    response.json({
      success: true,
      data   : postsResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

router.get("/filter", async (request, response) => {
  try {
    let   { needle }    = request.body;
    const postsResponse = await getByCategory(needle);

    response.json({
      success: true,
      data   : postsResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

router.get("/search", async (request, response) => {
  try {
    let   { needle }    = request.body;
    const postsResponse = await searchPosts(needle);

    response.json({
      success: true,
      data   : postsResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

router.post("/", auth, async (request, response) => {
  try {
    const postsResponse = await create(request.body);

    response.json({
      success: true,
      data   : postsResponse,
    });
  } catch (error) {
    response.status(400).json({
      success: false,
      error  : error.message,
    });
  }
});

module.exports = router;
