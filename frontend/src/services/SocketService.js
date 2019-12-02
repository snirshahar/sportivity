import io from 'socket.io-client';

const socket = io('http://localhost:3000')

export default{
    on,
    emit
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}










