import io from 'socket.io-client';

const BASE_URL = process.env.NODE_ENV !== 'development'
    ? '/api/'
    : '//localhost:3000/api/'
const socket = io(BASE_URL)

export default {
    on,
    emit
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}










