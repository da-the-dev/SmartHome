const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

const host = "192.168.2.218"
const port = 8080

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

        if(message.startsWith("$temp")) {
            var data = parseInt(message.substring(5))
            wss.clients.forEach(c => {
                if(c != ws && ws.readyState == WebSocket.OPEN)
                    c.send(`$website ${data}`)
            })
        }

        console.log("[Server] Message: " + message);
    })
})

app.get('/', (req, res) => { })

server.listen(port, host, () => console.log(`[Server] Listening on ${host}/${port}/`))