const io = require('socket.io-client');
const {port} = require('./src/config/env.js');

const socket = io(`http://localhost:${port}`, {
  auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGFiMjVlNTUzZGNkNDIxOGFkODBkMmMiLCJpYXQiOjE3NTYxMDk1NDMsImV4cCI6MTc1NjEwOTcyM30.RPL_pjq-SbnWBBrjuXm7EYMsWBawoiRVBki-V4oIMDM" }, //  Thay bằng accessToken
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

socket.on("user_online",(data)=> {
  console.log(data);
})

socket.on("user_offline",(data)=> {
  console.log(data);
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