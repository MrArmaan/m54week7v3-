const { Router } = require("express")
const bookRouter = Router();

const Book = require ("./model");

bookRouter.post("/books/addBook", async (request, response) => {
    try {
        const book = await Book.create({
            title: request.body.title,
            author: request.body.author,
            genre: request.body.genre,
        });
        response.status(201).json({ message: "success book created", book: book });
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

bookRouter.post("/books/addMultipleBooks", async (request, response) => {
    try {
        const book = await Book.insertMany(request.body);
        response.status(201).json({ message: "success book created", book: book });
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

module.exports = bookRouter;



