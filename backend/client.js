const io = require('socket.io-client');
const {port} = require('./src/config/env.js');

const socket = io(`http://localhost:${port}`, {
  auth: { token: "" }, //  Thay bằng accessToken
});


socket.on("connect",()=> {
    console.log('connect',socket.id);
    // Tạo 1 room chat
    socket.emit('create_chat',{
        receiverId: '68ab2c95b4de59a0ec8eadee'
    });
    // Tham gia vao 1 room chat 
    socket.emit('join_chat',{
        conversationId: '68abe18acc2b0ccf1462db3d',
    });

    // Gửi tin nhắn
    socket.emit('send_message',{
        conversationId: '68abe18acc2b0ccf1462db3d',
        text:'Hello',
        attachments: []
    });
})

// Thông tin room chat
socket.on('chat',(data) => {
    console.log(data);
})

// Nhận tin nhắn
socket.on('receive_message',(msg) => {
    console.log(msg);
})

socket.on("connect_error", (err) => {
  console.error("Connection error:", err.message);
});

socket.on("disconnect", () => {
  console.log("Disconnected");
});