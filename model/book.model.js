const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const Genre = {
    Adventure: String,
    Fantasy: String,
    Science_Fiction: String,
    Dystopian: String,
    Mystery: String,
    Horror: String,
    Thriller_nd_Suspense: String,
    Romance: String,
    Autobiography: String,
    History: String,
};

const BookSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a book name"],
        },
        author: {
            type: String,
            required: [true, 'Please enter the name of author'],
        },
        genre: {
            type: String,
            required: [true, "Please enter a book genre"],
            validate: {
                validator: (v) => Genre.hasOwnProperty(v),
                message: 'Invalid genre!'
            }
        },
        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        isbn: {
            type: String,
            required: false,
            default: "",
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
