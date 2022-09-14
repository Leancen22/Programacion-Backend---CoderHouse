import knex from "knex";
import { config } from "../utils/config.js";

const knexCli = knex(config.db)

knexCli.schema.dropTableIfExists('autos')
.then(() => {
    knexCli.schema.createTable('autos', table => {
        table.increments('id').primary();
        table.string('marca', 50).notNullable();
        table.string('modelo', 50).notNullable();
    })
    .then(() => console.log('TAbla creada'))
    .catch( err => {
        console.log(err)
        throw err
    })
    .finally( () => {
        knexCli.destroy()
    })
})