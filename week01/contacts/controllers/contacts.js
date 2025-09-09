const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const database = await mongodb.getDatabase();
    const result = database.collection('contacts').find();
    result.toArray().then((contacts) => {
        "res.setHeader('Content-Type', 'application/json');"
        res.status(200).json(contacts);
    });
};   

const getById = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const database = await mongodb.getDatabase();
    const result = database.collection('contacts').find({_id: contactId});
    result.toArray().then((contacts) => {
        "res.setHeader('Content-Type', 'application/json');"
        res.status(200).json(contacts[0]);
    });
}; 

module.exports = { getAll, getById };