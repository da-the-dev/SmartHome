let adress = window.location.href
// let host = adress.substring(7, adress.indexOf(":3000"))
// let port = 8080
let host = "192.168.2.218"
let port = 8080

/**@type {WebSocket} */
var socket

$(document).ready(() => {
    const socketMessageListener = (event) => {
        /**@type {string}*/
        const msg = event.data
        const args = msg.split(" ")

        if(args[1] == undefined) {
            const obj = $(`#a${args[0]}`)
            obj.removeClass("red")
            obj.addClass("green")
            obj.text("ONLINE")
        } else if(!isNaN(args[1])) {
            $(`#${args[0]}-value`).text(`${args[1]}C`)
        } else {
            switch(args[1].trim()) {
                case "on":
                    $(`#${args[0]}-status`).html('<h1>ВКЛ</h1>/ВЫКЛ')
                    break
                case "off":
                    $(`#${args[0]}-status`).html('ВКЛ/<h1>ВЫКЛ</h1>')
                    break
            }
        }
    }


    // Open
    const socketOpenListener = (event) => {
        $('#server-status').html('Статус сервера: <span class="green">ONLINE</span>')
        console.log('[Client] Connected to WS server');
        socket.send('%');
    };

    // Closed
    const socketCloseListener = (event) => {
        $('#server-status').html('Статус сервера: <span class="red">OFFLINE</span>')
        if(socket) {
            console.error('Disconnected.');
        }
        try {
            socket = new WebSocket(`ws://${host}:${port}`);
            socket.addEventListener('open', socketOpenListener);
            socket.addEventListener('message', socketMessageListener);
            socket.addEventListener('close', socketCloseListener);
        } catch(e) { }
    }
    socketCloseListener();

    $("#light-status").click(() => {
        socket.send("light")
    })
})
