
module.exports = connectSockets

function connectSockets(io) {
io.on('connection', socket => {
    socket.on('user visit', ({activityId, user}) =>{
        socket.join(activityId)
        socket.id = activityId;
        io.to(socket.id).emit('msg recieved', `${user} joined the chat`)
    })
    socket.on('chat addMsg', msg=>{
        io.to(socket.id).emit('msg recieved', msg)
    })
})
}