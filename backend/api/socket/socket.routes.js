const activityService = require('../activity/activity.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        //daniel here you use to send msg to a every visitor
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
        })

        socket.on('user listen activity', ({ activityId }) => {
            socket.activityId = activityId;
            socket.join(activityId)
        })
        socket.on('user unListen activity', ({ activityId }) => {
            delete socket.activityId;
            socket.leave(activityId)
        })

        socket.on('user joineded', ({ activityId, user }) => {
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has joined the activity`);
        })
        socket.on('user unjoineded', ({ activityId, user }) => {
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has left the activity`);
        })

        socket.on('chat addMsg', async (msg) => {
            const newMsg = await activityService.addMsg(msg.activityId, msg)
            io.to(msg.activityId).emit('msg recieved', newMsg)
        })
    })
}