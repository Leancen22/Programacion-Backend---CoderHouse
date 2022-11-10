__node server.js -p PUERTO --modo ('fork' por defecto o 'cluster')__

# Ejecucion con forever
    
    forever start .\server.js --port 8081

    forever start .\server.js --port 8081 --modo fork

# Ejecucion con pm2

__Modo FORK__

    pm2 start server.js --name="Servidor1" --watch -- --port 8081

__Modo Cluster__

    pm2 start server.js --name="Servidor2" --watch -i max -- --port 8082
    
__En la carpeta nginx, en nginx.conf esta la configuracion nginx__