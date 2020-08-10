const toolkit = require('./toolkit')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const WebSocket = require('ws')

// Find IP
const host = toolkit.findHost()
const port = 8080

// Clients and arduinos 
/**@type {Array<WebSocket>} */
var clients = new Array()
/**@type {Map<WebSocket, any>} */
var arduinos = new Map()

// Start the server
let wss = new WebSocket.Server({ server: server })

wss.on('connection', (ws) => {
    ws.on('message', msg => {
        // Client connected. End here, no msg is transmitted
        if(msg === "%") {
            console.log(`[Server] Client connected! Client count: ${wss.clients.size}`)
            clients.push(ws)
            return
        }

        // Message broadcast
        if(clients.includes(ws)) // If client sent a msg
            arduinos.forEach(a => { // Send it to all arduinos
                a.self.send(msg)
            })


        clients.forEach(c => { // Send it to all clients
            c.send(msg)
        })


        // Arduino connected
        if(!arduinos.has(ws)) {
            console.log(`[Server] Arduino connected! Client count: ${wss.clients.size}`)
            arduinos.set(ws, {
                "self": ws,
                "connected": true,
                "status": "none",
                "value": "none"
            })
            return
        }

        /**@type {Array<string>} */
        const args = msg.split(" ")
        const name = args.shift()

        var data = arduinos.get(ws)
        if(!isNaN(args[0])) { // If recieved a number, it's a value
            data.value = args[0]
            arduinos.set(ws, data)
        } else if(args[0]) { // If recieved a string, it's a status
            data.status = args[0]
            arduinos.set(ws, data)
        }
    })

    ws.onclose = () => {
        console.log(`[Server] Someone disconnected! Client count: ${wss.clients.size}`)
    }
})

app.get('/', (req, res) => { })
server.listen(port, host, () => console.log(`[Server] Listening on ${host}:${port}`))