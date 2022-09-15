const configMariaDB = require('../utils/configMariaDB')
const knex = require('knex')

const knexCli = knex(configMariaDB.db)

knexCli.schema.dropTableIfExists('productos')
    .then( () => {
        knexCli.schema.createTable('productos', table => {
            table.increments('id').primary()
            table.string('nombre', 50).notNullable()
            table.string('precio', 50).notNullable()
            table.string('foto', 255).notNullable()
        })
        .then( () => console.log('Tabla creada') )
        .catch( err => {console.log(err); throw err})
        .finally(() => {
            knexCli.destroy()
        })
    })