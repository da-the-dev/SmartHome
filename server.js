const toolkit = require('./toolkit')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

// Find IP
const host = toolkit.findHost()
const port = 8080

// Start the server
let wss = new WebSocket.Server({ server: server })

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        if(message === "close") {
            wss.clients.forEach(c => {
                c.close()
            })
            wss.close()
        }

        wss.clients.forEach(c => {
            if(c != ws && ws.readyState == WebSocket.OPEN)
                c.send(message)
        })

        if(message === "ALC")
            console.log("[Server] Arduino Light Connected!")
    })
})

app.get('/', (req, res) => { })
server.listen(port, host, () => console.log(`[Server] Listening on ${host}:${port}`))