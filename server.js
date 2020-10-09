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
/**@type {Array<object>} */
var arduinos = new Array()

// Start the server
let wss = new WebSocket.Server({ server: server })

wss.on('connection', (ws) => {
    console.log("connection") // DEBUG
    ws.on('message', msg => {
        // Analyzing the message
        // Handling connections
        if(msg === "%") { // That means that a client has connected
            console.log("[Server] Client connected")
            clients.push(ws)
            // ws.addEventListener("close", () => { // Add an event listener if client disconnects
            //     clients = clients.filter((value, index, array) => {
            //         if(value != ws)
            //             return value
            //     })
            // })
            ws.send("!arr" + JSON.stringify(arduinos))
            console.log("[DEBUG] Sent to the client: " + "!arr" + JSON.stringify(arduinos))
            return
        } else if(msg.startsWith("$")) {
            var name = msg.slice(1)
            arduinos.push({
                "name": msg.slice(1),
                "connected": true,
                "value": "",
                "status": ""
            })
            ws.addEventListener('close', () => { // Delete from array in case of close event
                clients.forEach(c => {
                    c.send('!ard' + JSON.stringify({
                        "name": msg.slice(1),
                        "connected": false,
                        "value": "none",
                        "status": "none"
                    }))
                })
                arduinos = arduinos.filter((value, index, array) => {
                    if(value != ws)
                        return value
                })
            })
            clients.forEach(c => { // Send information about the Arduino to clients
                c.send('!ard' + JSON.stringify({
                    "name": msg.slice(1),
                    "connected": true,
                    "value": "",
                    "status": ""
                }))
            })
            return
        }

        // // Handling Arduino commands
        // var args = msg.split(" ")
        // var name = args.shift()

        // if(args[0] == "on") {
        //     var data = {
        //         "name": name,
        //         "status": "on"
        //     }
        //     data = JSON.stringify(data)

        //     clients.forEach(c => {
        //         c.send(data)
        //     })
        // } else if(args[0] == "off") {
        //     var data = {
        //         "name": name,
        //         "status": "on"
        //     }
        //     data = JSON.stringify(data)

        //     clients.forEach(c => {
        //         c.send(data)
        //     })
        // } else if(!isNaN(args[0])) {
        //     var data = {
        //         "name": name,
        //         "value": parseInt(args[0])
        //     }
        //     data = JSON.stringify(data)
        //     clients.forEach(c => {
        //         c.send(data)
        //     })
        // }
    })

    ws.onclose = () => {
        console.log(`[Server] Someone disconnected! Client count: ${wss.clients.size}`)
    }
})

app.get('/', (req, res) => { })
server.listen(port, host, () => console.log(`[Server] Listening on ${host}:${port}`))