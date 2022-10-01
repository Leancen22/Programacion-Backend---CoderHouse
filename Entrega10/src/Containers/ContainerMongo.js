import mongoose from "mongoose";
import config from "../../config.js";

const cnxStr = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`

await mongoose.connect(cnxStr, config.mongo.options)

class ContainerMongo {
    constructor(nombreColeccion, esquema) {
        this.collecion = mongoose.model(nombreColeccion, esquema)
    }

    async guardar(objeto) {
        return await this.collecion.create(objeto)
    }

    async listar(id) {
        try {
            const docs = await this.collecion.find({'_id': id}, {__v: 0})
            if (docs.length == 0) {
                throw new Error(`Error al listar`)
            } else {
                return docs[0]
            }
        } catch (e) {
            throw new Error(`Error al listar ${error}`)
        }
    }

    async listarAll() {
        return await this.collecion.find({})
    }

    async actualizar(id, nuevoElem) {
        return this.collecion.updateOne({'_id': id}, {$set: nuevoElem})
    }

    async borrar(id) {
        return await this.collecion.deleteOne({'_id': id})
    }

    async borrarAll() {
        return await this.collecion.deleteMany({})
    }
}

export default ContainerMongo
