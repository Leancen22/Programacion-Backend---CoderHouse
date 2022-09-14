const configSqlite3 = require('../utils/configSqlite3')
const knex = require('knex')

const knexCli = knex(configSqlite3.db)

knexCli.schema.dropTableIfExists('mensajes')
    .then( () => {
        knexCli.schema.createTable('mensajes', table => {
            table.increments('id').primary()
            table.timestamps(true, true)
            table.string('user', 50).notNullable()
            table.string('mensaje', 50).notNullable()
        })
        .then( () => console.log('Tabla creada') )
        .catch( err => {console.log(err); throw err})
        .finally(() => {
            knexCli.destroy()
        })
    })