const express = require('express')
const app = express()
const server = require('http').Server(app)
const host = '192.168.2.218'
const port = 3000

app.use(express.static(process.cwd()))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html')
})

server.listen(port, host, () => {
    console.log(`[Website] Website's up on ${host}:${port}/`)
})