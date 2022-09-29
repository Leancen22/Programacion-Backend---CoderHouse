export default {
    fileSystem: {
        path: './DB'
    },
    mongodb: {
        host: 'localhost',
        port: 27017,
        dbName: 'ecommerce',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {
        "type": "service_account",
        "project_id": "ecommerce-7637a",
        "private_key_id": "7bed383d1db57150fe32f1f2f087b7b3841a5276",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCgP1ZjUb7ImfiB\ndjBRGuMp/pajIEXr6LCKTKuvCv8T/3L1fF8WLCM5qordstfC44eV5a7X/JIvs6ZY\nUINzzL6lmW+TZRA9h1/owzCarKGyKGpzs5xDcWyQhzqa+PTdNJnjSHZOOrBt0ihx\nSnk8YQQ42BZ0IX02pqGVMyXaDbFhW0ceIizDScuoCz6hEMlqwVTfGLnK1Lna1Fwj\nj8HoTT37oolytOQUWenzvMpMzmC88L3P73Tx20ocnr3dsjsPPNjNvG2fbFR4he1R\n8XN26aElXuqqZuvFxYGCRTFqPVwoczhSvvQvap/UnJl7USjL6DtHIVMigoFsSJp+\nFTKntPOhAgMBAAECgf9CsVAoq5iv6rSk+n/ow4fzvvGpRHR9NTPn9oDqq+88Vcwc\nvZ8UVxXYSa22RVkTi8JKFPqgBPbWquSw3uI7cDCcwXrhx0YqRKPKvPPhQfF/eItK\n5ZY7pXX764sCAzym4EsngCW0VlpHjPYLI/SzwFCNEJAulLkgSdsEr9jM4GHWSS9T\nfHXTkkowjNTmd8y/XoqKfdbgHGmEi6zfGyrkNjmrrrS/5Tmw8JLx62e7S+iICjLS\n1xoIxwDRNnYmxG8ncCHJz2PnwIX1hDcT+b4TIPzfLf0Z1zTMJvIQY41W/adP0Zlp\ngg1Couek/lsH28CzstsQ9ipgEBTK9rZI8G8SYzECgYEA1yfwvkKlSGxfNTtNyHyO\nGSdKeeWWu5Jf2xWN/qiXIzBD6e/ht+KJqRUSlrw2yVzgQXFebnVSEMbSCng81Kl/\nwOqYuWuwvz0lmWMWlPCgHfbjbeLVth3H+qVS3saPW/j41G1mwGlMkVsuRI8ioLr2\nx1Xh8Vi3qQq33NC3CpWUhmkCgYEAvqr45krCx5OAJTobj+hKCQNiPJJRvEC83vDk\nS10rO8KPtnN8NlsSInt1g5XCg6GdRYDjvq0eJKKmpAu4yToEuXqkKoB+wClAGkHD\njwZV2T7NAPSGxZ3fcL0fwUGG7EQWCJanMfoht390kx5rpu4mvGHyFct9J/+ndO3A\nFYMAjHkCgYAOfbQrPFXhgNsQvMPKYwk3DHxppVr3my41lUgRBM3ZIuEQGoX7Wpim\n+LJd0KNoAIdiIP6ZNfGnC50N83c1Y40lMyfCJUysNLQZlqDouyQtoHlE52g5cdwM\nN6JTOtBhA23O8OdgwjbT+24sU++jH7SLTG+BT9Ze3kfv6WbKobR1MQKBgF87C9gS\nDRkbXcy6KhwFXD0GOKGiPzq0ZuE/FfdiUH6nnZn2Mlr/v54DZd1UBnQyW1fkmVua\nIc0QhAS5ahDvbn6pd6dWyHf34nF62U7tTiGUkVXhzBKV2Iz5mQuwS9Bj7VFa1aVL\nll2NRk9YyVH17tj2XrBuE1PQB/aJ7P+Rj8uZAoGAdEgKRyZuu8JGAiZmtEdh9qUf\nMpbFq3AJWel08rUZVYp5cwOiDCqDJmJ5tSCzCY8Bbonb3IDaes5IRHGStINxfaQe\nEgAdYE16mlhkNN2yAjJ7QtHp505WWO37O8Zc+qtaaUz03UGtstq3secxdHgxwT8P\ncDnShUS2pmKrzaNfMp4=\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-6bq0p@ecommerce-7637a.iam.gserviceaccount.com",
        "client_id": "107265936968418247957",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6bq0p%40ecommerce-7637a.iam.gserviceaccount.com"
    },
    config: {
        administrator: true
    },
    MODO_PERSISTENCIA: 'json'
}