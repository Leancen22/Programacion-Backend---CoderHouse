const knex = require('knex')
const configSqlite3 = require('../utils/configSqlite3')

class ContenedorSQL {

    constructor (tableName) {
        this.knexCli = knex(configSqlite3.db)
        this.tableName = tableName
    }

    async listarAll () {
        try {
            return await this.knexCli.from(this.tableName).select('*')
        } catch (error) {
            throw error
        }
    }

    async listar (id) {
        try {
            return await this.knexCli.from(this.tableName).select('*').where({id: id})
        } catch (error) {
            throw error
        }
    }

    async insertar (obj) {
        try {
            return await this.knexCli(this.tableName).insert(obj)
        } catch (error) {
            throw error
        }
    }

    async actualizar (id, obj) {
        try {
            return await this.knexCli.from(this.tableName).where({id: id}).update(obj)
        } catch (error) {
            throw error
        }
    }

    async eliminar (id) {
        try {
            return await this.knexCli.from(this.tableName).where({id: id}).delete()
        } catch (error) {
            throw error
        }
    }

    cerrarConexion () {
        this.knexCli.destroy()
    }

}

module.exports = ContenedorSQL