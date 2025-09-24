const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Customers']
    const database = await mongodb.getDatabase();
    const result = await database.collection('customers').find();
    result.toArray(err => {
    if (err) {
        res.status(500).json(result.error || 'Some error occurred while retrieving the customers.');
    }
    }).then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    });
};   

const getById = async (req, res) => {
    //#swagger.tags = ['Customers']
    const customerId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = await database.collection('customers').find({_id: customerId});
    result.toArray(err => {
    if (err) {
        res.status(500).json(result.error || 'Some error occurred while retrieving the customer.');
    }
    }).then((customer) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customer[0]);
    });  
}; 

const createCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    const newCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    const database = await mongodb.getDatabase();
    const result = await database.collection('customers').insertOne(newCustomer);
    if (result.acknowledged !== 1) {
        res.status(201).json(result.insertedId);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the customer.');
    }
};

const updateCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    const customerId = new ObjectId(req.params.id);
    const updatedCustomer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };
    const database = await mongodb.getDatabase();
    const result = await database.collection('customers').updateOne({_id: customerId}, {$set: updatedCustomer});
    if (result.modifiedCount !== 1) {
        res.status(500).json(result.error || 'Some error occurred while updating the customer.');
    } else {
        res.status(204).end();
    }
};
    
const removeCustomer = async (req, res) => {
    //#swagger.tags = ['Customers']
    const customerId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = await database.collection('customers').deleteOne({_id: customerId});
    if (result.deletedCount !== 1) {
        res.status(500).json(result.error || 'Some error occurred while deleting the customer.'); 
    } else {
        res.status(204).end();
    }
};

module.exports = { 
    getAll,
    getById,
    createCustomer,
    updateCustomer,
    removeCustomer
};