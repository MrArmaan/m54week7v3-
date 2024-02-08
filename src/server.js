require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")

const connection = require("./db/connection");

const bookRouter = require("./books/routes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connection();

app.put("/books/:id", async (request, response) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!updatedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }
        response.json(updatedBook);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

app.delete("/books/:id", async (request, response) => {
    try {
        const deletedBook = await Book.findOneAndDelete({title:request.body.title});
        if (!deletedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }
        response.json({ message: 'Book deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
