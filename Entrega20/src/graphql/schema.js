import { buildSchema } from "graphql"

const productosSchema = buildSchema(`
    type Productos {
        id: ID!
        title: String,
        price: Int,
        categoria: String,
        Thumbnail: String
    }
    type Query {
        listar_productos: [Productos],
    }
`)

export default productosSchema