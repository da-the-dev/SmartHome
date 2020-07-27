const toolkit = require('./toolkit')
const express = require('express');
const app = express()
const server = require('http').Server(app)

const host = toolkit.findHost();
const port = 3000

app.use(express.static(process.cwd()))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html')
})

app.get('/arduino_check', (req, res) => {
    res.send("responce from website")
})

server.listen(port, host, () => {
    console.log(`[Website] Website's up on ${host}:${port}/`)
})