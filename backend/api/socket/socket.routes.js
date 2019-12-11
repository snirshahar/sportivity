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
            // io.to(userId).emit('msg to single user', `${user.fullName} has connected`);
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
            activity.attendees.map(async attendee => {
                const msg = {from: 'System', msg: `${JSON.stringify(attendee._id).includes(user._id) ? 'You\'ve' : user.fullName + ' has' } joined ${activity.title}`};
                console.log(JSON.stringify(attendee._id).includes(user._id))
                userService.addMsg(attendee._id, msg);
            })
        })
        socket.on('user unjoined', async ({ activityId, user }) => {
            const activity = await activityService.getActivity(activityId);
            socket.activityId = activityId;
            socket.to(socket.activityId).emit('msg to all activity members except sender', `${user.fullName} has left ${activity.title}`);
            io.to(user._id).emit('msg to single user', `You left ${activity.title}`);
            socket.leave(activityId)
            socket.leave(user._id)
            activity.attendees.map(async attendee => {
                const msg = {from: 'System', msg: `${user.fullName} has left the group ${activity.title}`};
                userService.addMsg(attendee._id, msg);
            })
            userService.addMsg(user._id, {from: 'System', msg: `You left the group ${activity.title}`})
        })
        socket.on('chat addMsg', async (msg) => {
            const newMsg = await activityService.addMsg(msg.activityId, msg)
            io.to(msg.activityId).emit('msg recieved', newMsg)
        })
    })
}