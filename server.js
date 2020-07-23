const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

let wss = new WebSocket.Server({ server: server })

var temp = 22

/**
 * 
 * @param {WebSocket.Server} wss 
 */
var sendTemp = (wss) => {
    temp++;
    wss.clients.forEach(c => {
        c.send(`$temp ${temp}`)
    })
}

wss.on('connection', (ws) => {
    console.log('[Server] New client connected');

    ws.on('message', (message) => {
        if(message === "close") {
            wss.clients.forEach(c => {
                c.close()
            })
            wss.close()
        }
    })

    setInterval(sendTemp, 1000, wss)
})

app.get('/', (req, res) => { })

server.listen(3000, () => console.log("[Server] Listening on port: 3000"))