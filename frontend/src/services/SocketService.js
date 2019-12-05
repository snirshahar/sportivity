import io from 'socket.io-client';

const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/'
    : '//localhost:3000/'
const socket = io(BASE_URL)
console.log(socket)

export default {
    on,
    emit
}

function on(eventName, cb) {
    console.log(`SocketService, emit ${eventName}, ${data}`)
    socket.on(eventName, cb)
}

function emit(eventName, data) {
    console.log(`SocketService, emit ${eventName}, ${data}`)
    socket.emit(eventName, data)
}










