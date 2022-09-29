
class ContenedorMemoria {

    //Constructor de la clase contenedor
    constructor () {
        this.memoria = []
    }

    /* 
        save (Object) : Number
        
        Recibe un objeto y retorna el id con el que se inserta al archivo
    */
    save (obj) {
        let newId
        if (this.memoria.length == 0) {
            newId = 1
        } else {
            newId = this.memoria[this.memoria.length - 1].id + 1
        }

        const newObj = {id: newId, ...obj}
        this.memoria.push(newObj)

        return newObj
    }

    /* 
        getById (number) : Object
        
        Recibe un id y retorna el objeto con el que se relaciona ese id
    */
    getById (id) {
        const elem = this.memoria.find(elem => elem.id == id)
        if (!elem) {
            throw {message: 'Error al listar un elemento, no encontrado'}
        } else {
            return elem
        }
    }

    /* 
        getById () : Object []
        
        Retorna el array de objetos del archivo
    */
    getAll () {
        return [...this.memoria]
    }

    /* 
        deleteById (number) : void
        
        Recibe un id y elimina el objeto con ese id
    */
    deleteById (id) {
        const index = this.memoria.findIndex(elem => elem.id == id)
        if (index == -1) {
            throw new Error('Error al borrar, elemento no encontrado')
        } else {
            return this.memoria.splice(index, 1)[0]
        }
    }

    /* 
        deleteAll () : void
        
        Elimina todos los objetos presentes en el archivo
    */
    deleteAll () {
        this.memoria = []
    }
    
    /**
     * updateById (Object) : void
     * 
     * Actualiza el objeto con id number con los datos de Object
     */
    updateById (id, obj) {

        const indexObj = this.memoria.findIndex((o) => o.id == id)
        
        this.memoria[indexObj] = {...this.memoria[indexObj], ...obj}
        console.log(this.memoria[indexObj])

        return `Actualizado correctamente`
    }
}

// function main() {
//     const p = new ContenedorMemoria()
//     console.log(p.getAll())
//     p.save({'id': 1, 'test': 'test'})
//     p.save({'id': 2, 'test': 'test2'})
//     p.save({'id': 3, 'test': 'test3'})
//     console.log(p.getAll())
//     console.log(p.getById(1))
//     p.updateById(1, {'test': 'testactualizado'})
//     p.updateById(2, {'test': 'testacewewtualizado'})
//     p.deleteById(3)
//     console.log(p.getById(3))
//     console.log(p.getAll())
// }
// main()

export default ContenedorMemoria