class Usuario {

    //Constructor de la clase usuario
    constructor (nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    /* 
        getFullName () : String
        
        Retorna el nombre completo del usuario.
    */
    getFullName () {
        return `Nombre completo: ${this.nombre} ${this.apellido}`
    }

    /* 
        addMascota (String) : void
        
        Retorna el nombre de la mascota y lo agrega al array de mascotas.
    */
    addMascota (mascota) {
        this.mascotas.push(mascota)
    }

    /* 
        countMascotas () : Number
        
        Retorna la cantidad de mascotas del usuario.
    */
    countMascotas () {
        return `Cantidad de mascotas: ${this.mascotas.length} mascota/s`
    }

    /* 
        addBook (String, String) : void
        
        Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto
        {nombre: String, autor: String} al array de libros.
    */
    addBook (nombre, autor) {
        this.libros.push({nombre, autor}) 
    }

    /* 
        getBookNames () : String[]
        
        Retorna un array con solo los nombres de los libros en el array del usuario.
    */
    getBookNames () {
        const arreglo = []
        for (const x in this.libros) {
            arreglo.push(this.libros[x].nombre)
        }
        return arreglo
    }
}

const usuario = new Usuario('Leandro', 'Mesa')

console.log(usuario)

console.log(usuario.getFullName())
usuario.addMascota('Mascota2')
usuario.addMascota('Mascota3')
console.log(usuario.countMascotas())
usuario.addBook('Nombre2', 'autor2')
usuario.addBook('Nombre3', 'autor3')
console.log(usuario.getBookNames())

usuario.addBook('Nombre4', 'autor4')
console.log(usuario.getBookNames())

console.log(usuario.libros)