
const PORT = 5000
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model/book.model.js')

const app = express()
app.use(express.json())

app.get('/', function (req, res) {
    res.send('Hello from Node API!')
});

app.post('/api/books', async function (req, res) {
    try {
        var existingBook = await Book.find({ ['isbn']: req.body.isbn });
        if (existingBook.length > 0) {
            return res.status(400).json({ message: 'Same book already exists!' });
        }
        const book = await Book.create(req.body);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error.message)
    }
});

app.get('/api/books', async function (req, res) {
    try {
        let sortCriteria = {}
        sortCriteria['updatedAt'] = -1

        const books = await Book.find().sort(sortCriteria);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(error.message)
    }
});

app.get('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

mongoose.connect('mongodb+srv://admin:admin@node-express-demo.dmunoxs.mongodb.net/Node-API?retryWrites=true&w=majority&appName=node-express-demo')
    .then(() => {
        console.log('Connected to Database!')
        app.listen(PORT, () => {
            console.log('Server is running on port: ' + PORT)
        })
    })
    .catch(() => {
        console.log('Database connection failed!');
    });