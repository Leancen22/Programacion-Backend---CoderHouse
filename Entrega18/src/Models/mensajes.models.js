import mongoose from "mongoose"

const SchemaMensajes = new mongoose.Schema({
    author: {
        id: { type: String, require: true },
        username: { type: String, require: true },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        email: { type: String },
        avatar: { type: String, require: true }
    },
    mensaje: {
        hora: { type: Date, require: true },
        text: { type: String, require: true }
    }
})
const MensajesModel = mongoose.model('mensajes', SchemaMensajes)

export default MensajesModel