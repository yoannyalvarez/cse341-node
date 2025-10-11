const mongodb = require ('../data/database');

describe('Database Module', () => {
    beforeAll(async () => {
        await mongodb.initDatabase();
    });
    afterAll(async () => {
        const db = await mongodb.getDatabase();
        await db.dropDatabase(); // Clean up the test database
    });

    test('should initialize the database connection', async () => {
        const db = await mongodb.getDatabase();
        expect(db).toBeDefined();
    });

    test('should throw an error if database is not initialized', async () => {
        // Simulate uninitialized state
        const originalDatabase = require('../data/database').database;
        require('../data/database').database = null;
        await expect(mongodb.getDatabase()).rejects.toThrow('Database not initialized');
        // Restore original state
        require('../data/database').database = originalDatabase;
    });
});