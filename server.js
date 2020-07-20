const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3000 });

server.once('listening', () => {
    console.log("WebSocket server is now listening");
})

server.on('connection', ws => {
    console.log('Someone connected')
    ws.send('Welcome');

    ws.on('message', msg => {
        console.log(`Message recieved: ${msg}`);
    });

});