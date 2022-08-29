const socket = io()

socket.on('from-server-mensajes', data => {
    console.log('mensajes:', data.DB_MENSAJES)
    render(data.DB_MENSAJES)
})

function render(mensajes) {
    const cuerpoMensajesHTML = mensajes.map((msj)=>{
        return `<span style="color: blue;"><b>${msj.author}</span>: </b><span>${msj.text}</span>`
    }).join('<br>')
    console.log(cuerpoMensajesHTML)

    document.querySelector('#historico').innerHTML = cuerpoMensajesHTML
}

function enviarMensaje () {
    const inputUser = document.querySelector('#user')
    const inputContenido = document.querySelector('#contenidoMensaje')

    const mensaje = {
        author: inputUser.value,
        text: inputContenido.value
    }

    socket.emit('from-client-mensaje', mensaje)
}