import MensajesDaosMongo from "../daos/Mensajes/MensajesDaoMongo.js";

let mensajesApi = MensajesDaosMongo.getInstance()

export const obtenerChat = async (req, res) => {
    res.render('chat')
}

export const chatPorEmail = async (req, res) => {
    
}