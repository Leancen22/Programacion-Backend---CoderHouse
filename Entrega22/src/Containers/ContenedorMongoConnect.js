import { config } from '../config/config.js'
import mongoose from 'mongoose'

let instance = null

class MongoDBClient {
    constructor() {
        this.connected = false
        this.client = mongoose
        this.firstConnection = (new Date()).toLocaleDateString()
    }

    async connect() {
        try {
            await this.client.connect(config.mongodb.host, config.mongodb.options)
            this.connected = true

            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error)
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            this.connected = false

            console.log('Base de datos desconectada')
        } catch (error) {
            console.log(error)
        }
    }

    static getInstance() {
        if (!instance) {
            instance = new MongoDBClient()
        }
        return instance
    }
}

export default MongoDBClient