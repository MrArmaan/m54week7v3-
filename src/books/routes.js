const { Router } = require("express")
const bookRouter = Router();

const Book = require ("./model");

const { addBook } = require("./controllers")
const { addMultipleBooks } = require("./controllers")
const { getAllBooks } = require("./controllers")
const { updateAuthor } = require("./controllers")
const { findBookByTitle } = require("./controllers")
const { deleteBook } = require("./controllers")

bookRouter.post("/books/addBook", addBook);

bookRouter.post("/books/addMultipleBooks", addMultipleBooks);

bookRouter.get("/books/getAllBooks", getAllBooks);

bookRouter.put("/books/updateAuthor", updateAuthor);

bookRouter.put("/books/:id", findBookByTitle );


app.delete("/books/:id", deleteBook )

module.exports = bookRouter;



