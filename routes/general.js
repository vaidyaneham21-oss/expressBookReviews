const express = require('express');
const public_users = express.Router();
const axios = require('axios');

// Get all books (async/await)
public_users.get('/', async function (req, res) {
    try {
        const response = await axios.get('http://localhost:5000/');
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching all books" });
    }
});

// Get book by ISBN (promise)
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            return res.send(response.data);
        })
        .catch(error => {
            return res.status(500).json({ message: "Error fetching book by ISBN" });
        });
});

// Get books by author (async/await)
public_users.get('/author/:author', async function (req, res) {
    const author = req.params.author;

    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        return res.send(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books by author" });
    }
});

// Get books by title (promise)
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => {
            return res.send(response.data);
        })
        .catch(error => {
            return res.status(500).json({ message: "Error fetching books by title" });
        });
});

module.exports.general = public_users;
