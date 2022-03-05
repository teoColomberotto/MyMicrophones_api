const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const COLLECTIONS = ['users', 'mics'];

class DBManager {
    constructor() {
        this.db = null;
        this.server = new MongoMemoryServer();
        this.connection = null;
    }

    // Spin up a new in-memory mongo instance
    async start() {
        const url = await this.server.getUri();
        try {
            await mongoose.connect(url, {
                dbName: "mics_api_test",
                useMongoClient: true
            });
            // this.db = this.connection.db(await this.server.getDbName());
            console.log(`MongoDB Connected: ${this.connection.connection.host}`.orange.underline)
        } catch (error) {
            console.log(error)
            process.exit(1)
        }

    }

    // Close the connection and halt the mongo instance
    async stop() {
        await mongoose.disconnect();
        return await this.server.stop();
    }

    // Remove all documents from the entire database - useful between tests
    // cleanup() {
    //     return Promise.all(COLLECTIONS.map((c) => this.db.collection(c).deleteMany({})));
    // }
}

module.exports = DBManager;