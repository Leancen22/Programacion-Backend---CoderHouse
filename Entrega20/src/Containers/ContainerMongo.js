import mongoose from "mongoose";
import MongoDBClient from "./ContenedorMongoConnect.js";
import { config } from "../config/config.js";

// const cnxStr = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`

// const cnxStr = `mongodb+srv://root:root@cluster0.uitaw.mongodb.net/ecommerce`

// await mongoose.connect(cnxStr, config.mongo.options)

class ContainerMongo {
    constructor(esquema) {
        this.collection = esquema
        this.conn = MongoDBClient.getInstance()
    }

    async guardar(objeto) {
        try {

            await this.conn.connect()

            const nuevaColeccion = new this.collection({ ...objeto });
            await nuevaColeccion.save();
            return nuevaColeccion;
        } catch (error) {
            throw new Error(error)
        } finally {
            await this.conn.disconnect()
        }
    }

    async listar(id) {
        try {

            await this.conn.connect()

            if (mongoose.Types.ObjectId.isValid(id)) {
                //const docs = await this.collection.findOne({'_id': id}, {__v: 0})
                const docs = await this.collection.findOne(id)
                if (docs.length == 0) {
                    throw Error('El producto solicitado no existe')
                } else {
                    return docs[0]
                }
            }
        } catch (error) {
            throw new Error(`Error al listar ${error}`)
        } finally {
            await this.conn.disconnect()
        }
    }

    async listarAll() {
        try {
            await this.conn.connect()

            return await this.collection.find({})
        } catch (error) {
            throw new Error(error)
        }
    }

    async listarAllObj(obj) {
        try {
            await this.conn.connect()

            return await this.collection.find({obj})
        } catch (error) {
            throw new Error(error)
        }
    }

    async actualizar(id, nuevoElem) {
        try {
            return this.collection.updateOne({'_id': id}, {$set: nuevoElem})
        } catch (error) {
            throw new Error(error)
        }
    }

    async borrar(id) {
        try {
            return await this.collection.deleteOne({'_id': id})
        } catch (error) {
            throw new Error(error)
        }
    }

    async borrarAll() {
        try {
            return await this.collection.deleteMany({})
        } catch (error) {
            throw new Error(error)
        }
    }
}

export default ContainerMongo
