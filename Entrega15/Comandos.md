node server.js -p PUERTO --modo ('fork' por defecto o 'cluster')

# Ejecucion con forever
    
    forever start .\server.js --port 8081
    forever start .\server.js --port 8081 --modo fork

# Ejecucion con pm2

