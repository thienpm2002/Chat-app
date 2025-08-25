const http = require('http');
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');

const app = require('./app.js');
const config = require('./config/env.js');
const connectDB = require('./config/db.js');

const { accessTokenKey} = require('./config/env.js');

const server = http.createServer(app);

const io = new Server(server,{
    cors: { origin: "*" }
})

connectDB(config.mongoURI);
const Message = require('./models/message.model.js');
const Conversation = require('./models/conversation.model.js');
const User = require('./models/user.model.js');
// Middleware auth
io.use((socket,next) => {
    try {
        const token  = socket.handshake.auth.token;
        if(!token) return next(new Error("No token provided"));

        const payload = jwt.verify(token,accessTokenKey);
        socket.userId = payload.userId;
        next();      
    } catch (error) {
        next(new Error(error.message));
    }
})

const onlineUsers = {};  // Danh sách các user online 

io.on("connect",(socket) => {
    console.log("User connected:", socket.id);
    
    // Online
    const userId = socket.userId;
    if (!onlineUsers[userId]) {
        onlineUsers[userId] = [];
    }
    onlineUsers[userId].push(socket.id);

    console.log("User online:", userId, onlineUsers);

    io.emit("user_online",{
        userId,
        online: true
    }) 
    
    // Tao 1 nhóm chat và lưu vào db
    socket.on('create_chat', async (data) => {
        let chat = await Conversation.findOne({
            isGroup: false,
            members: { $all: [socket.userId, data.receiverId], $size: 2 }
        });

        if (!chat) {
            chat = await Conversation.create({
                members: [socket.userId, data.receiverId],
                isGroup: false
            });
        }
        socket.emit('chat', chat);
    });
    // Tham gia vòa room chat
    socket.on('join_chat',(data) => {
        socket.join(data.conversationId);
        console.log(`User ${socket.id} joined conversation ${data.conversationId}`);
    })
    // Nhận msg và lưu vào db
    socket.on('send_message',async (data) => {
        const message = await Message.create({
            ...data,
            senderId: socket.userId
        })
        await Conversation.findByIdAndUpdate(data.conversationId, {
            latestMessage: message._id,
        });
        // Gửi tin nhắn đến tất cả user trong nhóm chat
        io.to(data.conversationId).emit("receive_message",message);
    })
   

    socket.on("disconnect", async () => {
        // Offline
        onlineUsers[userId] = onlineUsers[userId].filter(socketId => socketId !== socket.id );

        if(onlineUsers[userId].length === 0){
            delete onlineUsers[userId];
        }
        await User.findByIdAndUpdate(userId,{ lastSeen: new Date() });
        socket.broadcast.emit("user_offline",{
            userId,
            online: false
        })
        console.log("User disconnected:", socket.id);
    });
})

const PORT = config.port || 3000;
server.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
})