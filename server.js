const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 8080

 //socket io
 const io = require('socket.io')(http)

 io.on('connection',(socket) =>{
    console.log('connected..')
    socket.on('message',(msg)=>{
      socket.broadcast.emit('message',msg)
    })
 })

http.listen(PORT, () =>{
    console.log('server up on port 8080')
})

app.use(express.static(__dirname + '/public'))

//routes
 app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/index.html')
 })

