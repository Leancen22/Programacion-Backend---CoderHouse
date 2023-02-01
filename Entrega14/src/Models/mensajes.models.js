import mongoose from "mongoose"

const SchemaMensajes = new mongoose.Schema({
    author: {
        nombre: { type: String, require: true },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        email: { type: String, require: true },
        avatar: { type: String, require: true }
    },
    fyh: { type: String, require: true },
    text: { type: String, require: true }
})
const MensajesModel = mongoose.model('mensajes', SchemaMensajes)

export default MensajesModel