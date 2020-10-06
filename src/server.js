const express = require("express");
const app     = express();
const cors    = require("cors");

const userRouter       = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const countriesRouter  = require("./routes/countries");
const postsRouter      = require("./routes/posts");
const commetsRouter    = require("./routes/comments");

app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRouter);
app.use("/categories", categoriesRouter);
app.use("/countries", countriesRouter);
app.use("/posts", postsRouter);
app.use("/comments", commetsRouter);

module.exports = app;
