import ContainerMongo from "../../Containers/ContainerMongo.js";

class UsuariosDaosMongo extends ContainerMongo {
    constructor(nombreColeccion, esquema) {
        super('usuarios', {
            username: {type: String, require: true},
            password: {type: String, require: true}
        })
    }
}

export default UsuariosDaosMongo