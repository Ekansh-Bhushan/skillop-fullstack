const connectDB = require('./src/db/config.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const postRoute = require('./src/routes/post');
const userRoute = require('./src/routes/user');
const notificationRoute = require('./src/routes/notification');
const mentorRoute = require('./src/routes/mentor');
const menteeRoute = require('./src/routes/mentee');
const chats = require('./src/routes/chatRoutes');
const message = require('./src/routes/messageRoutes');
const help = require('./src/routes/helperRoutes');
const feedBackRoute = require('./src/routes/feedBackRoute');
const searchRoutes = require('./src/routes/searchRoutes');
const eventRoutes = require('./src/routes/eventRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const commentRouters = require('./src/routes/commentRoutes');
const hashtagRoutes = require('./src/routes/hashtagRoutes');
const meetingRoutes = require('./src/routes/meetingRoutes');
require('dotenv').config();
// console.log(process.env.JWT_KEY);
const app = express();
const PORT = process.env.PORT | 4000;
connectDB();
// const corsOptions = {
//     origin: "https://front-nine-jet.vercel.app",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
// };
const allowedOrigins = [
  'http://localhost:3000',
  'https://skillop.in',
  'https://www.skillop.in',
  'http://89.116.236.71:4000',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', postRoute);
app.use('/api', userRoute);
app.use('/api', notificationRoute);
app.use('/api', mentorRoute);
app.use('/api', menteeRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chats);
app.use('/api/message', message);
app.use('/api/college', help);
app.use('/api/event', eventRoutes);
app.use('/api/v2', searchRoutes);
app.use('/api/comment', commentRouters);
app.use('/api/hashtag', hashtagRoutes);
app.use('/api/meeting', meetingRoutes)

// share images in uploads/pubic to frontend
app.use(
  '/api/public/posts',
  express.static('backend/src/uploads/public/posts')
);
app.use(
  '/api/public/users',
  express.static('backend/src/uploads/public/users')
);
app.use(
  '/api/public/payment',
  express.static('backend/src/uploads/public/payment')
);
app.use(
  '/api/public/introVideo',
  express.static('backend/src/uploads/public/introVideo')
);

app.use('/api/feedback', feedBackRoute);

const path = require('path');

const _dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const server = app.listen(PORT, () => {
  console.log('🔥 Server is running at PORT, ', PORT);
});

const io = require('socket.io')(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true, // if needed
  },
});

let activeUsers = [];

io.on('connection', (socket) => {
  //add new user
  socket.on('new-user-add', (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }

    console.log('Connected Users', activeUsers);
    io.emit('get-users', activeUsers);
  });

  //send Message
  socket.on('send-message', (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log('sending from socket', receiverId);
    console.log('Data', data);
    if (user) {
      io.to(user.socketId).emit('receive-message', data);
    }
  });

  socket.on('disconnect', () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log('User disconnected', activeUsers);
  });
});

const { Server } = require("socket.io");

const iot = new Server(PORT, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

iot.on("connection", (socket) => {
  console.log(`Socket Connected`, socket.id);
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    iot.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    iot.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    iot.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    iot.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    console.log("peer:nego:needed", offer);
    iot.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    console.log("peer:nego:done", ans);
    iot.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});

