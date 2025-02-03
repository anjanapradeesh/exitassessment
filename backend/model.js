const mongoose = require("mongoose");

const schema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  img_url: { type: String, required: true },
});

const BlogModel = mongoose.model("Blog", schema);

module.exports = BlogModel;