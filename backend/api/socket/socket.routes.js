const activityService = require('../activity/activity.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('user listen', ({ activityId }) => {
            console.log('user listen');
        socket.on('single socket', ({ user }) => {
            if(!user) return;
            else if(user ==='guest'){
                const num = activityService.randomId()
                user = {_id: num, fullName: `guest${num}`}
            } 
            const userId = user._id
            socket.join(userId)
            io.to(userId).emit('msg to single user', `${user.fullName} has connected`);
        })
        socket.on('user connect to socket activity', ({ activityId }) => {
            socket.activityId = activityId;
            socket.join(activityId)
            socket.activityId = activityId;
        })
        socket.on('user joined', ({ activityId, user }) => {
            socket.join(user._id)
            socket.join(activityId)
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has joined the activity`);
            io.to(user._id).emit('msg to single user', `${user.fullName} you just connected`);
        })
        socket.on('user unjoined', ({ activityId, user }) => {
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has left the activity`);
            io.to(user._id).emit('msg to single user', `${user.fullName} you just unconnected`);
            socket.leave(activityId)
            socket.leave(user._id)
        })
        socket.on('chat addMsg', async (msg) => {
            console.log('chat addMsg')
            const newMsg = await activityService.addMsg(msg.activityId, msg)
            io.to(msg.activityId).emit('msg recieved', newMsg)
        })
    })
}