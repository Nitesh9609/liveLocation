const express = require('express')
const app = express()

const http = require('http')
const path = require('path')

const socket = require('socket.io')
const server = http.createServer(app)
const io = socket(server)

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

io.on("connection", function(socket) {

    socket.on("send-location", (data) => {
        io.emit("receive-location", {id: socket.id, ...data})

        console.log({id: socket.id, ...data});
        
    })

    socket.on("disconnect", () => {
        io.emit("disconnect-user", socket.id )
    })

    console.log("connected");
    
})

app.get('/', (req, res) =>{
    res.render('index')
})

server.listen(3000, () =>{
    console.log('Server is running on port 3000')
})