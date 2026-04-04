const { MongoClient } = require("mongodb")

class DBService {
    connectionString = process.env.DB_CONNECTION_STRING
    constructor() {
        this.client = new MongoClient(this.connectionString)
    }
    async connect() {
        try {
            this.conn = await this.client.connect()
            console.log("Connected to MongoDB")
        }
        catch (err) {
            console.error("Failed to connect to MongoDB", err)
        }
    }
    getConnection() {
        return this.conn
    }
}

module.exports = new DBService()