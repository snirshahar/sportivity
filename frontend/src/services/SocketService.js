import io from 'socket.io-client';

const BASE_URL = (process.env.NODE_ENV !== 'development')
    ? '/'
    : '//localhost:3000/'

const socket = io(BASE_URL)

export default {
    on,
    emit,
    activityConnect
}

function activityConnect(activities, user) {
    if (!user) return emit("single socket", { user: 'guest' })
    activities.map(activity => {
        activity.attendees.map(attendee => {
            if (attendee._id === user._id) {
                emit("user connect to socket activity", { activityId: activity._id })
            }
        })
    })
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}










