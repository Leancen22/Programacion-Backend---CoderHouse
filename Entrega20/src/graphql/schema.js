import { buildSchema } from "graphql"

const productosSchema = buildSchema(`
    type Productos {
        _id: ID!
        title: String,
        price: Int,
        categoria: String,
        thumbnail: String
    }
    input ProductosUpdate {
        title: String,
        price: Int,
        categoria: String,
        thumbnail: String
    }
    type Query {
        listar_productos: [Productos],
        listar_producto(_id: ID!): Productos
    }
    type Mutation {
        borrar_producto(_id: ID!): Productos
        actualizar_producto(_id: ID!, datos: ProductosUpdate): Productos
    }
`)

export default productosSchema