import UsuariosDaosMongo from "../daos/Usuarios/UsuariosDaosMongo.js"
import ProductosDaoMongo from "../daos/Productos/ProductosDaoMongo.js"
import { logger, Ruta } from "../../utils/logger.config.js"

let api = UsuariosDaosMongo.getInstance()
let api_prductos = ProductosDaoMongo.getInstance()

export const inicio = async (req, res) => {

    const username = req.user.username
    const email = req.user.email
    const avatar = req.user.avatar

    if (req.user) {

        const productos = await api_prductos.listarAll();

        console.log(req.user)
        res.render('vista', {username, email, avatar, productos})
    } else {
        res.redirect('/login')
    }
}