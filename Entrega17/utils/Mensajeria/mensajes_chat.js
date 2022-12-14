import MensajesDaosMongo from "../../src/daos/Mensajes/MensajesDaoMongo.js";
import {normalize, schema} from "normalizr";

let api = MensajesDaosMongo.getInstance()

const schemaAuthor = new schema.Entity('author', {}, {idAttribute: 'email'})
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, {idAttribute: 'id'})
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, {idAttribute: 'id'})

const normalizarMensaje = (mensajesConId) => normalize(mensajesConId, schemaMensajes)

async function listarMensajesNormalizados() {
    const mensajes = await api.listarAll()
    const normalizados = normalizarMensaje({id: 'mensajes', mensajes})
    return normalizados
}

export const centro_mensajes = async (io) => {
    io.on('connection', async (socket) => {
        console.log(`Un nuevo cliente se conecto ${socket.id}`)
    
        //const elem = await listarMensajesNormalizados()
        //console.log(util.inspect(elem, false, 12, true))
    
        io.sockets.emit('mensajes', await listarMensajesNormalizados())
        //socket.emit('mensajes', await mensajesApi.listarAll())
    
        const productos = await api.listarAll()
        io.sockets.emit('from-server-productos', productos)
    
        socket.on('nuevoMensaje', async mensaje => {
            mensaje.fyh = new Date().toLocaleString()
            await mensajesApi.guardar(mensaje)
            console.log(mensaje)
            logger.error(`Ha ocurrido un error en mensajes`)
            io.sockets.emit('mensajes', await listarMensajesNormalizados())
            //socket.emit('mensajes', await mensajesApi.listarAll())
        })
    
        socket.on('from-client-producto', producto => {
            productos.push(producto)
            io.sockets.emit('from-server-productos', productos)
        })
    })
}