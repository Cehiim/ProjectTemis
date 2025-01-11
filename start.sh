# start.sh
#!/bin/sh
npm start &  # Inicia a aplicação principal
node proxy/server.js  # Inicia o servidor proxy
