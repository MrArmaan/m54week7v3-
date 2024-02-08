require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection is working");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

connection();

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    author: {
        type: String,
    },
    genre: {
        type: String,
    },
});

const Book = mongoose.model("Book", bookSchema);

app.post("/books/addBook", async (request, response) => {
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

app.post("/books/addMultipleBooks", async (request, response) => {
    try {
        const book = await Book.insertMany(request.body);
        response.status(201).json({ message: "success book created", book: book });
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});


app.get("/books/getAllBooks", async (request, response) => {
    try {
        const books = await Book.find({});
        response.json({ message: "success all the books", books: books });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
});

app.put("/books/updateAuthor", async (request, response) => {
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
  });


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
