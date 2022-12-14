import mongoose from "mongoose";

// const cnxStr = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`

// const cnxStr = `mongodb+srv://root:root@cluster0.uitaw.mongodb.net/ecommerce`

// await mongoose.connect(cnxStr, config.mongo.options)

class ContainerMongo {
    constructor(esquema) {
        this.collection = esquema
    }

    async guardar(objeto) {
        const nuevaColeccion = new this.collection({ ...objeto });
        await nuevaColeccion.save();
        return nuevaColeccion;
    }

    async listar(id) {
        try {
            if (mongoose.Types.ObjectId.isValid(id)) {
                const docs = await this.collection.findOne({'_id': id}, {__v: 0})
                if (docs.length == 0) {
                    throw Error('El producto solicitado no existe')
                } else {
                    return docs[0]
                }
            }
        } catch (error) {
            throw new Error(`Error al listar ${error}`)
        }
    }

    async listarAll() {
        return await this.collection.find({})
    }

    async listarAllObj(obj) {
        return await this.collection.find({obj})
    }

    async actualizar(id, nuevoElem) {
        return this.collection.updateOne({'_id': id}, {$set: nuevoElem})
    }

    async borrar(id) {
        return await this.collection.deleteOne({'_id': id})
    }

    async borrarAll() {
        return await this.collection.deleteMany({})
    }
}

export default ContainerMongo
