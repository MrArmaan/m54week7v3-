const mongoose = require("mongoose")

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection is working");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

module.exports = connection;
