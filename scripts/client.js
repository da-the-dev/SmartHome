let adress = window.location.href
let host = adress.substring(7, adress.indexOf(":3000"))
let port = 8080

$(document).ready(() => {
    const socket = new WebSocket(`ws://${host}:${port}`)

    // Switch lights
    $("#light-status").click(() => {
        socket.send("$light")
    })

    var lightStatus = false;

    socket.addEventListener('open', (event) => {
        $('#server-status').text("Статус сервера: ONLINE")
        console.log("[Client] Connected to WS server");
    })

    // WebSocket recieved
    socket.addEventListener('message', (event) => {
        var msg = event.data
        if(msg === "$light click on")
            $("#light-status").html("<h1>ВКЛ</h1>/ВЫКЛ")
        if(msg === "$light click off")
            $("#light-status").html("ВКЛ/<h1>ВЫКЛ</h1>")
    })
})