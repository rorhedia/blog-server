const { ObjectID } = require("mongodb");
const Posts = require("../models/posts");
const { encode, decode } = require("../lib/validations");

const getAll = async () => {
  let result = await Posts.find()
    .populate("user_id")
    .populate("category_id")
    .exec();

  [...result].forEach((post) => {
    post.title = decode(post.title);
  });

  return result;
};

const getById = async (id) => {
  let result = await Posts.find({ _id: id })
    .populate("user_id")
    .populate("category_id")
    .exec();

  [...result].forEach((post) => {
    post.title = decode(post.title);
  });

  return result;
};

const getPopulars = async () => {
  let result = await Posts.find()
    .populate("user_id")
    .populate("category_id")
    .sort({ visits: -1 })
    .limit(5);

  [...result].forEach((post) => {
    post.title = decode(post.title);
  });

  return result;
};

const getByCategory = async (needle) => {
  let newArr = [];

  needle.forEach((val) => {
    newArr.push({ category_id: ObjectID(val) });
  });

  let result = await Posts.find({
    // $or: [
    //   { category_id: ObjectID("5f7ba098a90572b00de7f56e") },
    //   { category_id: ObjectID("5f7ba0a9a90572b00de7f56f") },
    // ],
    $or: newArr,
  })
    .populate("user_id")
    .populate("category_id")
    .exec();

  [...result].forEach((post) => {
    post.title = decode(post.title);
  });

  return result;
};

const searchPosts = async (needle) => {
  let result = await Posts.find({ title: { $regex: needle, $options: "i" } })
    .populate("user_id")
    .populate("category_id")
    .exec();

  [...result].forEach((post) => {
    post.title = decode(post.title);
  });

  return result;
};

const create = async (data) => {
  let { title, content } = data;

  title = encode(title);
  content = encode(content);

  let dataEncoded = {
    ...data,
    title,
    content,
  };

  let result = await Posts.create(dataEncoded);

  return result;
};

module.exports = {
  getAll,
  getPopulars,
  getByCategory,
  getById,
  searchPosts,
  create,
};

// {"$or":[{"title":"Prueba"},{"title":"Prueba tres"}]}
