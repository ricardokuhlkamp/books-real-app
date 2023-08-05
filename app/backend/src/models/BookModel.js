const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String },
  image: { type: String},
  pages: { type: String },
  year: {type: Number },
  edition: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model("Book", bookSchema);
