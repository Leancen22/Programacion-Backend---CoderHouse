import axios from "axios"

const url = 'http://localhost:8081/productos'

axios(url).then(response => {
    console.log(response.data)
}).catch(error => {
    console.log(error)
})

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