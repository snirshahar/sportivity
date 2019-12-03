const activityService = require('../activity/activity.service')

module.exports = connectSockets

function connectSockets(io) {
io.on('connection', socket => {
    socket.on('user listen', ({activityId}) =>{
        console.log(activityId);
        socket.join(activityId)
        socket.activityId = activityId;
    })
    socket.on('user joined', ({activityId, user}) =>{
        socket.activityId = activityId;
        io.to(socket.activityId).emit('msg recieved', {from:`${user.fullName} joined the activity`})
    })
    socket.on('user left', ({activityId, user}) =>{
        socket.activityId = activityId;
        io.to(socket.activityId).emit('msg recieved', {from:`${user.fullName} left the activity`})
        socket.leave(activityId)
    })
    socket.on('chat addMsg', async (msg) =>{
        const newMsg = await activityService.addMsg(msg.activityId ,msg)
        io.to(msg.activityId).emit('msg recieved', newMsg)
    })
})
}