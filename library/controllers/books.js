const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Books']
    const database = await mongodb.getDatabase();
    const result = await database.collection('books').find();
    result.toArray().then((books) => {
        "res.setHeader('Content-Type', 'application/json');"
        res.status(200).json(books);
    });
};   

const getById = async (req, res) => {
    //#swagger.tags = ['Books']
    const bookId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = await database.collection('books').find({_id: bookId});
    result.toArray().then((books) => {
        "res.setHeader('Content-Type', 'application/json');"
        res.status(200).json(books[0]);
    });
}; 

const createBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const newBook = {
        tittle: req.body.tittle,
        author: req.body.author,
        genre: req.body.genre,
        number_of_pages: req.body.number_of_pages,
        publication_date: req.body.publication_date,
        category: req.body.category
    };
    const database = await mongodb.getDatabase();
    const result = await database.collection('books').insertOne(newBook);
    if (result.acknowledged !== 1) {
        res.status(201).json(result.insertedId);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the book.');
    }
};

const updateBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const bookId = new ObjectId(req.params.id);
    const updatedBook = {
        tittle: req.body.tittle,
        author: req.body.author,
        genre: req.body.genre,
        number_of_pages: req.body.number_of_pages,
        publication_date: req.body.publication_date,
        category: req.body.category
    };
    const database = await mongodb.getDatabase();
    const result = await database.collection('books').updateOne({_id: bookId}, {$set: updatedBook});
    if (result.modifiedCount !== 1) {
        res.status(500).json(result.error || 'Some error occurred while updating the book.');
    } else {
        res.status(204).end();
    }
};
    
const removeBook = async (req, res) => {
    //#swagger.tags = ['Books']
    const bookId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = await database.collection('books').deleteOne({_id: bookId});
    if (result.deletedCount !== 1) {
        res.status(500).json(result.error || 'Some error occurred while deleting the book.'); 
    } else {
        res.status(204).end();
    }
};

module.exports = { 
    getAll,
    getById,
    createBook,
    updateBook,
    removeBook
};