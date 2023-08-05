const BookModel = require("../models/BookModel");

const getBooks = async () => {
  try {
    const books = await BookModel.find();
    if (!books) {
      return { status: 'NOTFOUND', data: 'Product not found' };
    }
    return { status: 'SUCCESSFUL', data: books };
  } catch (error) {
    return { status: 'ERROR', data: `Error searching for book by title: ${error}` };
  }
};

const getBookById = async (_id) => {
  try {
    const book = await BookModel.findById(_id);
    if (!book) {
      return { status: 'NOTFOUND', data: 'Product not found' };
    }
    return { status: 'SUCCESSFUL', data: book };
  } catch (error) {
    return { status: 'ERROR', data: `Error searching for book by id: ${error}` };
  }
};

const getBookByTitle = async (title) => {
  try {
    const books = await BookModel.find({title: { $regex: title}});
    if (!books) {
      return { status: 'NOTFOUND', data: 'Product not found' };
    }
    return { status: 'SUCCESSFUL', data: books };
  } catch (error) {
    return { status: 'ERROR', data: `Error searching for book by title: ${error}` };
  }
};

const getBookByAuthor = async (author) => {
  try {
    const books = await BookModel.find({author: { $regex: author}});
    if (!books) {
      return { status: 'NOTFOUND', data: 'Product not found' };
    }
    return { status: 'SUCCESSFUL', data: books };
  } catch (error) {
    return { status: 'ERROR', data: `Error searching for author of books: ${error}` };
  }
};

const getBookByGenre = async (genre) => {
  try {
    const books = await BookModel.find({genre: { $regex: genre}});
    if (!books) {
      return { status: 'NOTFOUND', data: 'Product not found' };
    }
    return { status: 'SUCCESSFUL', data: books };
  } catch (error) {
    return { status: 'ERROR', data: `Error searching for author of books: ${error}` };
  }
};

const saveBook = async (title, author, genre, pages, year, edition, price, image) => {
  try {     
    await BookModel.insertMany([
      { title, author, genre, pages, year, edition, price, image },
    ]);
    return { status: 'CREATED', data: 'Book created successfully!' };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

const updateBook = async (_id, updatedFields) => {
  try {
    const updatedBook = await BookModel.findByIdAndUpdate(
      _id,
      updatedFields,
      { new: true } // Para retornar o documento atualizado após a atualização
    );

    if (!updatedBook) {
      return { status: 'NOTFOUND', data: 'Product not found' };
    }

    return { status: 'SUCCESSFUL', data: updatedBook };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

const deleteBook = async (_id) => {
  try {
    await BookModel.findByIdAndDelete(_id);
    return { status: 'SUCCESSFUL', data: [] };
  } catch (error) {
    return { status: 'ERROR', data: `Error: ${error}` };
  }
};

module.exports = {
 getBooks,
 getBookByTitle,
 getBookByAuthor,
 saveBook,
 updateBook,
 deleteBook,
 getBookById,
 getBookByGenre,
};