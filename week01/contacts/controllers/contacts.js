const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const database = await mongodb.getDatabase();
    const result = await database.collection('contacts').find();
    result.toArray().then((contacts) => {
        "res.setHeader('Content-Type', 'application/json');"
        res.status(200).json(contacts);
    });
};   

const getById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = await database.collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        "res.setHeader('Content-Type', 'application/json');"
        res.status(200).json(contacts[0]);
    });
}; 

const createContact = async (req, res) => {
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const database = await mongodb.getDatabase();
    const result = await database.collection('contacts').insertOne(newContact);
    if (result.acknowledged !== 1) {
        res.status(201).json(result.insertedId);
    } else {
        res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
};

const updateContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const database = await mongodb.getDatabase();
    const result = await database.collection('contacts').updateOne({_id: contactId}, {$set: updatedContact});
    if (result.modifiedCount !== 1) {
        res.status(500).json(result.error || 'Some error occurred while updating the contact.');
    } else {
        res.status(204).end();
    }
};
    
const removeContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = await database.collection('contacts').deleteOne({_id: contactId});
    if (result.deletedCount !== 1) {
        res.status(500).json(result.error || 'Some error occurred while deleting the contact.'); 
    } else {
        res.status(204).end();
    }
};

module.exports = { 
    getAll,
    getById,
    createContact,
    updateContact,
    removeContact
};