const fs = require('fs/promises')

const text = './productos.txt'

async function cargar() {
    await fs.readFile(text, 'utf-8').then( contenido => {
        if (contenido == '') {
            fs.writeFile(text, '[]')
        }
    }).catch( err => {
        console.log(err)
    })
}

async function save(objeto) {
    
    const obj = await getAll()

    let newId
    if (obj.length == 0) {
        newId = 1
    } else {
        newId = obj[obj.length - 1].id + 1   
    }
    
    const newObj = {...objeto, id: newId}
    obj.push(newObj)

    try {
        await fs.writeFile(text, JSON.stringify(obj, null, 2))
        return newId
    } catch (error) {
        throw new Error(`Error al guardar ${error}`)
    }
}

async function getById(id) {
    const objeto = await getAll()
    return objeto.find( obj => obj.id === id )
}

async function getAll() {
    try {
        const objs = JSON.parse(await fs.readFile(text, 'utf-8'), null, 2)
        return objs
    } catch (error) {
        console.log(error)
    }
}

async function deleteById(id) {
    let objeto = await getAll()
    let obj = objeto.filter( obj => obj.id !== id )
    
    try {
        await fs.writeFile(text, JSON.stringify(obj, null, 2))
    } catch (error) {
        console.log(error)
    }
}

async function deleteAll() {
    await fs.writeFile(text, '[]') 
}

async function main() {
    await deleteAll()
    console.log(await getAll())
}
main()