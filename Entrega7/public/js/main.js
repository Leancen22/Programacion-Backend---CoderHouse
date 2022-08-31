const socket = io()

socket.on('from-server-mensajes', mensajes => {
    console.log(mensajes)
    render(mensajes)
})

socket.on('from-server-productos', productos => {
    console.log(productos)
    render_productos(productos)
})

function render(mensajes) {

    const cuerpoMensajesHTML = mensajes.map(msj => {
        return `
            <span><b style="color: blue;">${msj.user}</b> <span style="color: brown;">[${msj.fecha_actual}]</span>:</span><span style="color: green;"> ${msj.mensaje}</span>
        `
    }).join('<br>')

    document.querySelector('#historialChat').innerHTML = cuerpoMensajesHTML
    
}

function render_productos(productos) {
    const cuerpoMensajesHTML = productos.map(prod => {
        return `
            <tr>
                <td>${prod.nombre}</td>
                <td>${prod.precio}</td>
                <td><img src="${prod.foto}" width="30"></td>
            </tr>
        `
    }).join('')

    document.querySelector('#historialProductos').innerHTML = cuerpoMensajesHTML
}

function enviarMensaje () {
    const inputUser = document.querySelector('#user')
    const inputContenido = document.querySelector('#contenidoMensaje')

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const mensaje = {
        author: inputUser.value,
        text: inputContenido.value
    }

    if (emailRegex.test(inputUser)) {
        socket.emit('from-client-mensaje', mensaje)
    }
}

function enviarProducto () {
    const inputNombre = document.querySelector('#nombre')
    const inputPrecio = document.querySelector('#precio')
    const inputFoto = document.querySelector('#foto')

    const producto = {
        title: inputNombre.value,
        price: inputPrecio.value,
        thumbnail: inputFoto.value
    }

    socket.emit('from-client-producto', producto)
}