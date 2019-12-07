const activityService = require('../activity/activity.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        //daniel here you use to send msg to a every visitor
        socket.on('single socket', ({ user }) => {
            if(user ==='guest'){
                var user = {_id: 123, fullName: 'guest123'}
            //here guest get a new id from server
            // user.fullName = guest****
            // user._id = await ... 
            }
            var userId = (user._id)? user.id : 123 
            // const userId = user._id
            socket.join(userId)
            io.to(userId).emit('user msg', `${user.fullName} has connected`);
        })
        socket.on('user connect', ({ activityId }) => {
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