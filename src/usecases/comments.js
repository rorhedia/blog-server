const Comments           = require("../models/comments");
const { encode, decode } = require("../lib/validations");

const getById = async (id) => {
  let result = await Comments.find({ _id: id }).populate("country_id").exec();

  [...result].forEach((comment) => {
    comment.name    = decode(comment.name);
    comment.phone   = decode(comment.phone);
    comment.message = decode(comment.message);
  });

  return result;
};

const createComment = async (data) => {
  let { name, phone, message } = data;

  name    = encode(name);
  phone   = encode(phone);
  message = encode(message);

  let dataEncoded = {
    ...data,
    name,
    phone,
    message,
  };

  let result = await Comments.create(dataEncoded);

  return result;
};

module.exports = { getById, createComment };
