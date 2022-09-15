const configSqlite3 = {
    db: {
        client: 'better-sqlite3',
        connection: {
            filename: "./DB/ecommerce.db3"
        },
        useNullAsDefault: true
    }
}

module.exports = configSqlite3