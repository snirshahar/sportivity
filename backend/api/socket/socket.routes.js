const activityService = require('../activity/activity.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('user listen', ({ activityId }) => {
            console.log('user listen');
            socket.join(activityId)
            socket.activityId = activityId;
        })
        socket.on('user joined', ({ activityId, user }) => {
            console.log('user join');

            socket.activityId = activityId;
            io.to(socket.activityId).emit('msg recieved', { from: `${user.fullName} joined the activity` })
        })
        socket.on('user left', ({ activityId, user }) => {
            console.log('user left')
            socket.activityId = activityId;
            io.to(socket.activityId).emit('msg recieved', { from: `${user.fullName} left the activity` })
            socket.leave(activityId)
        })
        socket.on('chat addMsg', async (msg) => {
            console.log('chat addMsg')
            const newMsg = await activityService.addMsg(msg.activityId, msg)
            io.to(msg.activityId).emit('msg recieved', newMsg)
        })
    })
}