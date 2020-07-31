function readFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                return rawFile.responseText
            }
        }
    }
    rawFile.send(null);
}

const settings = JSON.parse(readFile(`settings_t.json`))
const host = settings.host
const port = settings.port



const socket = new WebSocket(`ws://${host}:${port}`)

var lightStatus = false;

socket.addEventListener('open', (event) => {
    $('#server-status').text("Статус сервера: ONLINE")
    console.log("[Client] Connected to WS server");
})

// WebSocket recieved
socket.addEventListener('message', (event) => {
    var msg = event.data
    if(msg.startsWith("$light")) {
        $("#light-status").text(`Статус:\n${msg.substring(7)}`)
    }
})

// Switch lights
var switchLight = () => {
    if(lightStatus) {
        socket.send(`$light off`)
        lightStatus = !lightStatus
    } else {
        socket.send(`$light on`)
        lightStatus = !lightStatus
    }
}