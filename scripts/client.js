let adress = window.location.href
let host = adress.substring(7, adress.indexOf(":3000"))
let port = 8080

/**@type {WebSocket} */
var socket = null

var connect = () => {
    socket = new WebSocket(`ws://${host}:${port}`)
}

$(document).ready(() => {
    var reconnect = () => {
        if(!socket) {
            connect()
        }
        socket.addEventListener('open', (event) => {
            $('#server-status').html(`Статус сервера: <span class="green">ONLINE</span>`)
            console.log("[Client] Connected to WS server");
        })

        // WebSocket recieved
        socket.addEventListener('message', (event) => {

        })

        socket.addEventListener('close', () => {
            $('#server-status').html(`Статус сервера: <span class="red">OFFLINE</span>`)
            console.log("[Client] Lost connection to WS server");
            socket = null
        })
    }

    setInterval(reconnect, 5000)
})

