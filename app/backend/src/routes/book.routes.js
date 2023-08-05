const express = require('express');

const BookController = require("../controllers/BookController");
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.get("/books", validateJWT, BookController.getBooks);
router.get("/title",  validateJWT, BookController.getBookByTitle);
router.get("/author",  validateJWT, BookController.getBookByAuthor);
router.get("/genre",  validateJWT, BookController.getBookByGenre);
router.get("/book/:_id",  validateJWT, BookController.getBookById);
router.post("/savebook",  validateJWT, BookController.saveBook);
router.put("/updatebook/:_id",  validateJWT, BookController.updateBook);
router.delete("/deletebook/:_id",  validateJWT, BookController.deleteBook);

module.exports = router;
