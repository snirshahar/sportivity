const activityService = require('../activity/activity.service')
module.exports = connectSockets
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('single socket', ({ user }) => {
            if(!user) return;
            if(user ==='guest'){
                const num = Math.floor(Math.random() * 1000000);
                user = {_id: num, fullName: `guest${num}`}
            } 
            const userId = user._id
            socket.join(userId);
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
        socket.on('user joined', async ({ activityId, user }) => {
            const activity = await activityService.getActivity(activityId);
            socket.join(user._id)
            socket.join(activityId)
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has joined ${activity.title}`);
            io.to(user._id).emit('msg to single user', `You joined ${activity.title}`);
            activity.attendees.map(attendee => {
                console.log(attendee)
                // attendee.inbox.unshift({from: 'System', msg: `${user.fullName} has joined ${activity.title}` })
            })
        })
        socket.on('user unjoined', async ({ activityId, user }) => {
            const activity = await activityService.getActivity(activityId);
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has left ${activity.title}`);
            io.to(user._id).emit('msg to single user', `You left ${activity.title}`);
            socket.leave(activityId)
            socket.leave(user._id)
        })
        socket.on('chat addMsg', async (msg) => {
            const newMsg = await activityService.addMsg(msg.activityId, msg)
            io.to(msg.activityId).emit('msg recieved', newMsg)
        })
    })
}