import axios from "axios"

//Se realizan las pruebas usando productos como indica la consigna, funciona de misma forma para el resto de endpoints.
const url = 'http://localhost:8081/productos'

//Consultar productos
axios(url).then(response => {
    console.log(response.data)
}).catch(error => {
    console.log(error)
})

//Agregar productos (podria usarse el modulo faker)
axios.post(url, {
    title: 'desde axios',
    price: 1,
    categoria: 'Axios',
    thumbnail: 'Foto axios'
}).then(response => {
    console.log(response)
}).catch(error => {
    console.log(error)
})

//Elimina un producto especifico por id, reemplazar id por id dado por mongo
axios.delete(`${url}/63ab7cdc661c4b40859cd8b6`).then(response => {
    console.log(response.data)
}).catch(error => {
    console.log(error)
})

//Elimina todos los productos
axios.delete(url).then(response => {
    console.log(response.data)
}).catch(error => {
    console.log(error)
})