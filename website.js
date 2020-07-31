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

server.listen(port, host, () => {
    console.log(`[Website] Website's up on http://${host}:${port}/`)
})