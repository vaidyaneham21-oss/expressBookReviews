const express = require('express');
const public_users = express.Router();
const axios = require('axios');

let books = require("./booksdb.js");

// Get all books using async/await
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({message: "Error fetching books"});
    }
});

// Get book by ISBN using promises
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).json({message: "Error fetching book"}));
});

// Get books by author using async/await
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({message: "Error fetching books by author"});
    }
});

// Get books by title using promises
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => res.send(response.data))
        .catch(error => res.status(500).json({message: "Error fetching books by title"}));
});

module.exports.general = public_users;
