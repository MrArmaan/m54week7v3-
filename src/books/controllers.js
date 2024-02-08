const Book = require("./model")

const addBook = async (request, response) => {
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
}

const addMultipleBooks = async (request, response) => {
    try {
        const book = await Book.insertMany(request.body);
        response.status(201).json({ message: "success book created", book: book });
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

const getAllBooks = async (request, response) => {
    try {
        const books = await Book.find({});
        response.json({ message: "success all the books", books: books });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

module.exports = {
    addBook: addBook,
    addMultipleBooks: addMultipleBooks,
    getAllBooks: getAllBooks,
    

}