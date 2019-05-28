import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.emit('sendMsg', {name:'kaikai', date: Date.now()})
console.log('客户端向服务器发消息', {name: 'kaikai', date: Date.now()})

socket.on('receiveMsg', function(data) {
  console.log('客户端接收到服务器发送的消息', data)
})