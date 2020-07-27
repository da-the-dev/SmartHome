module.exports = {
    findHost() {
        const os = require('os')
        var networkInterfaces = os.networkInterfaces();
        var host
        var port = 8080

        for(var devName in networkInterfaces) {
            var iface = networkInterfaces[devName]

            for(var i = 0; i < iface.length; i++) {
                if(iface[i].family == "IPv4" && iface[i].address != "127.0.0.1" && !iface[i].internal)
                    return iface[i].address
            }
        }
    }
}