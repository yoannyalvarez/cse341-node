const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Customers']
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('customers').find();
        result.toArray().then((customers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(customers);
        });
    } catch (err) {
            res.status(500).json(result.error || 'Some error occurred while retrieving the customers.');
    }
    
};   

const getById = async (req, res) => {
    //#swagger.tags = ['Customers']
    try {
        const customerId = new ObjectId(req.params.id);
        const database = await mongodb.getDatabase();
        const result = await database.collection('customers').find({_id: customerId});
        result.toArray().then((customers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(customers[0]);
        });
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while retrieving the customer.');
    }  
}; 

const createCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    const newCustomer = {
        tittle: req.body.tittle,
        author: req.body.author,
        genre: req.body.genre,
        number_of_pages: req.body.number_of_pages,
        publication_date: req.body.publication_date,
        category: req.body.category
    };
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('customers').insertOne(newCustomer);
        if (result.acknowledged !== 1) {
            res.status(201).json(result.insertedId);
        } 
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while creating the customer.');
    }


 
};

const updateCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    const customerId = new ObjectId(req.params.id);
    const updatedCustomer = {
        tittle: req.body.tittle,
        author: req.body.author,
        genre: req.body.genre,
        number_of_pages: req.body.number_of_pages,
        publication_date: req.body.publication_date,
        category: req.body.category
    };
    try {
        const database = await mongodb.getDatabase();
        const result = await database.collection('customers').updateOne({_id: customerId}, {$set: updatedCustomer});
        if (result.modifiedCount !== 1) {
            throw err;
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while updating the customer.');
    }
};
    
const removeCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    try {
        const customerId = new ObjectId(req.params.id);
        const database = await mongodb.getDatabase();
        const result = await database.collection('customers').deleteOne({_id: customerId});
        if (result.deletedCount !== 1) {
            throw err;
        } else {
            res.status(204).end();
        }
    } catch (err) {
        res.status(500).json(result.error || 'Some error occurred while deleting the customer.'); 
    }
};

module.exports = { 
    getAll,
    getById,
    createCustomer,
    updateCustomer,
    removeCustomer
};