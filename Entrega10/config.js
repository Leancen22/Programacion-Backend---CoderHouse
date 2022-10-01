const config = {
    modo: 'firebase',
    mongo: {
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
        "private_key_id": "3bd2f344b2ccce150133f801cdc6df0d6e9aec34",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC/avC3HNHgUp4h\njP2PhLaRG+CPJ6uecRffXsQU9CJhErdLx0Q9Z/G2EfupmsQRRfPqbYyPZwCFZKTz\noezSlh3lQ6OaXDEgGDNBYiLxUymWCwFvlOPAOmBs+PXSYylsY5yXAuMtLCqqDRel\nGrI+AkMfRwaHihzMzvZU2ZxhmTZOPi38lbaYEcS4tM6cbfh3KXg+8aiS/i51ctr8\nrOIJJe0hb9UPASf1sO7S5gzV21mZsimPIMAmmtfiOi2jaLyNMca5a6ebcmFiYzEI\nqrpeiRlzlwSXxWIg8218Z2pO3qJwjoeuZOPydWEEvojqcyXfamlm8/dAN5vcHvxc\n4nLm9yNrAgMBAAECggEAUjfHVAeLeDxUUpniEWKSHkrojeSeuOvfsqBcPZnNKH/m\n/iQFghCjCC66N1PUEo1G4vMR9EhsN1+O4Fy1QZCcH60JWRRvP1dVsKhL1PcA/kMU\n503+80K/xx66S5cvJDC3AkAJvw3g93CvLsoENFE5bnZN7irbCvd8Y96iZmNuKXWa\nk7REz6C3akSY/j+diMzGnKCcm/Rx6TjJNpLlxkd7ax+cXtINW5SbNT5Dcxv7mc4T\nC1oetzOnq0s1prseVJYUcpKZVMOFZukUAobfNKE+PXfRzSCDnOBzRL2vZ5Be6rV/\nwmH32X7aUs1xwyxom6svjAAH7uWgZP517QttRSRTvQKBgQDfXI4nJslQD/rJC2ed\ndm0tdY8de6i4nvUsb23sNfnWLhUa1nkzeJbVHUZ3pomCTmoeZvZi07o3AklfY+I3\nIidz5W4xnx+2Ri6d8NV99HrUadddVThUrVyOiOVYW7TRsSzmBUnHvUmOrJtnOm4Q\nFYlX7J/S4E3PW2mv8q5+VVzxxwKBgQDbY3CuYwXd6YAs0aOLGCQ0VEQ5rtOBBI1B\npOwEXp80GMzHcvjEqRm6v4b+m2ybr/n5lTRj8QPObI2jKhjLF51VJU+WfED4KYms\n2zYf4qyFUbhrwtBqmKlj3ytKfcyEZUoZq4cHtspXbJ/PLtoaVu8DLg8CAN9slFy/\nfnwNViJBPQKBgQCARSLNkRSjCco3knkakFv6czyQ7ebiv0aFEijKMeUb/rLYCrrn\nuCTGll1VcSoezvFaLD7qWjTiSkngoffTOaX2hJdXn84SWxOCWEACaVfwjCfFzZ7f\n4f75S9yJdYDNuzXRks/gCPApIy7LhV6Xlgadm6Hc9Ds7DYAQLwnOOy95GQKBgDEK\np5Oz+wnCOq7KJh7fxKgV9jJWzFzY4aK89S184WXJ7WzgXI/JpUDDs6+SmtKqodyS\n5+U3aTxps7e3n1c27iqsboAbQoK29lm3nv+9sgcTX4BnSiOqAKOcrZa3TFKEOe5H\nE6Y7zDuCwq6TsJmWuVMipqQyAb/J4nnEEoMAsCOZAoGBAK3ura/wOv0AIxomKTQD\n87c7NvKcLqGPyLE5RE4wNSKXlSgQt7KRR3lHmBOCMxbiOUz/NaeO/oJhXp9PCb8Z\nwNd/XZADsHbeY2Nl+NL2kUdQ8ss7t+LD+yztX/DpDGX2i91o6GDJLmkcUne2r1G1\nayINHYr7itZMWtr73qN1u/WN\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-6bq0p@ecommerce-7637a.iam.gserviceaccount.com",
        "client_id": "107265936968418247957",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6bq0p%40ecommerce-7637a.iam.gserviceaccount.com"
    }
}

export default config