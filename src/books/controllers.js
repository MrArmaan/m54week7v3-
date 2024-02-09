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

const updateAuthor = async (request, response) => {
    try {
      const title = request.body.title;
      const updatedAuthor = request.body.author;

      const updatedBook = await Book.findOneAndUpdate(
        { title: title },
        { $set: { author: updatedAuthor } },
        { new: true }
      );
  
      if (!updatedBook) {
        return response.status(404).send({ message: "Error: Book not found" });
      }
  
      response.send({ message: "Success: Author updated", book: updatedBook });
    } catch (error) {
      response.status(500).send({ message: "Error: Unable to update author" });
    }
  }


  const findBookByTitle = async (request, response) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(request.params.id, request.body, { new: true });
        if (!updatedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }
        response.json(updatedBook);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
}

const deleteBook = async (request, response) => {
    try {
        const deletedBook = await Book.findOneAndDelete({title:request.body.title});
        if (!deletedBook) {
            return response.status(404).json({ message: 'Book not found' });
        }
        response.json({ message: 'Book deleted' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

const updateBookByTitle = async (request, response) => {
    try {
      const { title, fieldToUpdate, updatedValue } = request.body;
      const allowedFields = ["title", "author", "genre"];
  
      if (!allowedFields.includes(fieldToUpdate)) {
        return response
          .status(400)
          .json({ message: "Invalid field to update" });
      }
  
      const updatedBook = await Book.findOneAndUpdate(
        { title: title },
        { $set: { [fieldToUpdate]: updatedValue } }, 
        { new: true }
      );
  
      if (!updatedBook) {
        return response.status(404).json({ message: "Book not found" });
      }
  
      response.json({
        message: "Success: Book updated",
        book: updatedBook
      });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  };

module.exports = {
    addBook: addBook,
    addMultipleBooks: addMultipleBooks,
    getAllBooks: getAllBooks,
    updateAuthor: updateAuthor,
    findBookByTitle: findBookByTitle,
    deleteBook: deleteBook,
    updateBookByTitle: updateBookByTitle,
}