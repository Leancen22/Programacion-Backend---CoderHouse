import mongoose from 'mongoose'
import config from '../config.js'

const cnxStr = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`

await mongoose.connect(cnxStr, config.mongodb.options)

class ContenedorMongo {
    
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async getById(id) {
        try {
            return this.coleccion.find({_id: id})
        } catch (error) {
            throw error
        }
    }

    async getAll() {
        return this.coleccion.find({})
    }

    async save(obj) {
        return this.coleccion.create(obj)
    }

    async updateById(id, obj) {
        if( !mongoose.Types.ObjectId.isValid(id) ) throw 'Error al intentar acceder al elemento';

        return this.coleccion.updateOne({_id: id}, {$set: obj})
    }

    async deleteById(id) {
        return this.coleccion.deleteOne({_id: id})
    }

    async deleteAll() {
        return this.coleccion.deleteMany({})
    }    

}

// async function main() {
//     const m = new ContenedorMongo('personas', {
//         nombre: { type: String, required: true },
//         apellido: { type: String, required: true },
//         edad: { type: Number, required: true },
//     })
//     await m.guardar({nombre: 'Leandro', apellido: "Mesa", edad: 17})
// }   
// main()

export default ContenedorMongo
