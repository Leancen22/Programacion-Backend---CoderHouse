node server.js -p PUERTO --modo ('fork' por defecto o 'cluster')

# Ejecucion con forever
    
    forever start .\server.js --port 8081
    forever start .\server.js --port 8081 --modo fork

# Ejecucion con pm2

    pm2 start server.js --name="Servidor3" --watch -- --port 9091
    