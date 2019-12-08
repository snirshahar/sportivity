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

function activityConnect(activities, user){
    console.log(activities, user);
    
    if(user && activities){
        activities.forEach(activity=> {
          activity.attendees.forEach(attendee=>{
            if(attendee._id===user._id){
              emit("user connect to socket activity", { activityId: activity._id })
          }
          })
        })
      } else emit("single socket", { user: 'guest' })
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}










