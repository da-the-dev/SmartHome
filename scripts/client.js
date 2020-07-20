const ws = new WebSocket("localhost:3000")

ws.onopen(() => {
    document.getElementById('server-status').innerText = "ONLINE"
})

ws.onmessage((message) => {
    document.getElementById('server-status').innerText = "ONLINE"
    console.log(ws.readyState);
})

ws.onclose(() => {
    document.getElementById('server-status').innerText = "OFFLINE"
})

console.log(ws.readyState);

