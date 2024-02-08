const { Router } = require("express")
const bookRouter = Router();

const Book = require ("./model");

const { addBook } = require("./controllers")
const { addMultipleBooks } = require("./controllers")
const { getAllBooks } = require("./controllers")

bookRouter.post("/books/addBook", addBook);

bookRouter.post("/books/addMultipleBooks", addMultipleBooks);

bookRouter.get("/books/getAllBooks", getAllBooks);

module.exports = bookRouter;



