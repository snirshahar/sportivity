const activityService = require('../activity/activity.service');
const userService = require('../user/user.service');

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
            socket.join(user._id)
            socket.join(activityId)
            socket.activityId = activityId;
            io.in(socket.activityId).emit('add user', user)
        })
        socket.on('user unjoined', async ({ activityId, user }) => {
            const activity = await activityService.getActivity(activityId);
            socket.activityId = activityId;
            io.to(user._id).emit('msg to single user', `You left ${activity.title}`);
            io.in(socket.activityId).emit('remove user', user._id)
            socket.leave(activityId)
            socket.leave(user._id)
        })
        socket.on('chat addMsg', async (msg) => {
            const newMsg = await activityService.addMsg(msg.activityId, msg)
            io.to(msg.activityId).emit('msg recieved', newMsg)
        })
    })
}