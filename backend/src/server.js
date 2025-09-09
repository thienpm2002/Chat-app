const http = require('http');
const { Server } = require("socket.io");
const jwt = require('jsonwebtoken');
const app = require('./app.js');
const config = require('./config/env.js');
const connectDB = require('./config/db.js');
const { accessTokenKey } = require('./config/env.js');

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

connectDB(config.mongoURI);

const User = require('./models/user.model.js');
const Notification = require('./models/notification.model.js');
// Middleware xác thực socket
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if(!token) return next(new Error("No token provided"));
        const payload = jwt.verify(token, accessTokenKey);
        socket.userId = payload.userId;
        next();      
    } catch (error) {
        next(new Error(error.message));
    }
});

const onlineUsers = {}; // userId -> [socketId]

io.on("connect", (socket) => {
    const userId = socket.userId;
    console.log(`User connected: ${socket.id} (UserId: ${userId})`);

    socket.join(userId.toString());

    if(!onlineUsers[userId]) onlineUsers[userId] = [];
    onlineUsers[userId].push(socket.id);
    console.log('Online Users:', onlineUsers);

    io.emit('onlineUsers', onlineUsers);
    socket.broadcast.emit("user_online", { userId, socketId: socket.id });

    // Update profile broadcast
    socket.on("update_profile", (data) => {
        socket.broadcast.emit("new_profile", data);
    });

    // Join room
    socket.on("join_room", (chatId) => {
        socket.join(chatId.toString());
        console.log(`✅ User ${userId} joined room ${chatId}`);
    });

    // Send message
    socket.on('send_message', async (data) => {
        try {
            const { receiver , newMessage } = data;
            if(onlineUsers[receiver._id] && onlineUsers[receiver._id].length !==0){
                io.to(receiver._id.toString()).emit("message_notification", newMessage.sender._id);
            }else {
                const existingNotifications = await Notification.find({
                    senderId: newMessage.sender._id,
                    receiverId: receiver._id
                })
                if(existingNotifications.length === 0){
                    await Notification.create({
                        senderId: newMessage.sender._id,
                        receiverId: receiver._id
                    })
                }
            }
            socket.to(newMessage.chatId.toString()).emit("receive_message", newMessage);

        } catch (err) {
            console.error("Error send_message:", err);
            socket.emit("error_message", { message: "Send message failed" });
        }
    });



    // Disconnect
    socket.on("disconnect", async () => {
        onlineUsers[userId] = onlineUsers[userId].filter(id => id !== socket.id);
        if(onlineUsers[userId].length === 0) {
            delete onlineUsers[userId];
            socket.broadcast.emit("user_offline", { userId, socketId: socket.id });
            await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
        }
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = config.port || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
