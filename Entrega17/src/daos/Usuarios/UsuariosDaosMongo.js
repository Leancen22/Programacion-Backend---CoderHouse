import ContainerMongo from "../../Containers/ContainerMongo.js";

import UsuariosModel from "../../Models/usuarios.models.js";

class UsuariosDaosMongo extends ContainerMongo {
    constructor(esquema) {
        super(UsuariosModel)
    }
}

export default UsuariosDaosMongo