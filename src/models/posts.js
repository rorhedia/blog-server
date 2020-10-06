const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  user_id: {
    type    : mongoose.Types.ObjectId,
    ref     : "users",
    required: true,
  },
  category_id: {
    type    : mongoose.Types.ObjectId,
    ref     : "categories",
    required: true,
  },
  title: {
    type     : String,
    required : true,
    maxlength: 60,
    minlength: 2
  },
  content: {
    type    : String,
    required: true
  },
  image: {
    type    : String,
    required: true
  },
  active: {
    type   : Boolean,
    default: true
  },
  visits: {
    type: Number
  },
  created: {
    type   : Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("posts", postsSchema);