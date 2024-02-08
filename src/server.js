require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")

const connection = require("./db/connection");

const bookRouter = require("./books/routes");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

connection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
