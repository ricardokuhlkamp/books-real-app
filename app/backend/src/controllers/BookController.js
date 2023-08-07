const BookModel = require("../models/BookModel");
const BookService = require("../services/BookService");
const mapStatusHTTP = require("../utils/mapStatusHTTP");

module.exports.getBooks = async (req, res) => {
  const { status, data } = await BookService.getBooks();
  res.status(mapStatusHTTP(status)).send(data);
};

module.exports.getBookById = async (req, res) => {
  const { _id } = req.params;
  const { status, data } = await BookService.getBookById(_id);
  res.status(mapStatusHTTP(status)).send(data);
}

module.exports.getBookByTitle = async (req, res) => {
  const { title } = req.query;
  const { status, data } = await BookService.getBookByTitle(title);
  res.status(mapStatusHTTP(status)).send(data);
};

module.exports.getBookByAuthor = async (req, res) => {  
  const { author } = req.query;
  const { status, data } = await BookService.getBookByAuthor(String(author));
  res.status(mapStatusHTTP(status)).send(data);
};

module.exports.getBookByGenre = async (req, res) => {
  const { genre } = req.query;
  const { status, data } = await BookService.getBookByGenre(genre);
  res.status(mapStatusHTTP(status)).send(data);
};

module.exports.saveBook = async (req, res) => {
  const { title, author, genre, pages, year, edition, price, image } = req.body;
   
  const { status, data } = await BookService.saveBook(
    title, author, genre, pages, year, edition, price, image,
  );
  res.status(mapStatusHTTP(status)).send(data);
};

module.exports.updateBook = async (req, res) => {
  const { _id } = req.params;
  const { title, author, genre, year, edition, price, image } = req.body;
  const updatedFields = { title, author, genre, year, edition, price: Number(price).toFixed(2), image };
  updatedFields.price = (Number(price)).toFixed(2);
  const { status, data } = await BookService.updateBook(_id, updatedFields);
  res.status(mapStatusHTTP(status)).send(data);
}

module.exports.deleteBook = async (req, res) => {
  const { _id } = req.params;
  const { status, data } = await BookService.deleteBook(_id);
  res.status(mapStatusHTTP(status)).send(data);
};
