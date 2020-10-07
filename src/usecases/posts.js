const { ObjectID }       = require("mongodb");
const Posts              = require("../models/posts");
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

const getPopulars = async () =>
  await Posts.find()
    .populate("user_id")
    .populate("category_id")
    .sort({ visits: -1 })
    .limit(5);

const getByCategory = async (needle) => {
  let result = await Posts.find({
    $or: [
      { category_id: ObjectID("5f7ba098a90572b00de7f56e") },
      { category_id: ObjectID("5f7ba0b0a90572b00de7f570") },
    ],
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

  title   = encode(title);
  content = encode(content);

  let dataEncoded = {
    ...data,
    title,
    content,
  };

  let result = await Posts.create(dataEncoded);

  return result;
};

module.exports = { getAll, getPopulars, getByCategory, searchPosts, create };

// {"$or":[{"title":"Prueba"},{"title":"Prueba tres"}]}
