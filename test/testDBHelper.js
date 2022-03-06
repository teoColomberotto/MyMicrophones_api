const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const COLLECTIONS = ['users', 'mics'];

class DBManager {
    constructor() {
        this.db = null;
        this.server = null;
        this.connection = null;
    }

    // Spin up a new in-memory mongo instance
    async start() {
        this.server = await MongoMemoryServer.create();
        const url = this.server.getUri();
        try {
            this.connection = await mongoose.connect(url, {
                dbName: 'mics_api_test',
            });
            this.db = this.connection.connection.db;
            // console.log(`MongoDB Connected: ${this.connection.connection.host}`.cyan.underline)
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }

    // Close the connection and halt the mongo instance
    async stop() {
        // console.log(`MongoDB disonnected:`.cyan.underline)
        await mongoose.disconnect();
        const stopServer = await this.server.stop();
        return stopServer;
    }

    // Remove all documents from the entire database - useful between tests
    cleanup() {
        return Promise.all(
            COLLECTIONS.map((c) => this.db.collection(c).deleteMany({})),
        );
    }
}

module.exports = DBManager;
