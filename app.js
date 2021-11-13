// const { sequelize } = require('./models');
// sequelize.sync({ force: true });

require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');

const orderWorkerRoute = require('./routes/orderWorkerRoute');

const orderRoute = require('./routes/orderRoute');
const profileRoute = require('./routes/profileRoute');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');

const cityRoute = require('./routes/cityRoute');
const authRoute = require('./routes/authRoute');
const errorController = require('./controller/errorController');
//////////////////////////////////////////////////////////

app.use(cors());
// create Table
app.use(express.json());

// use Route
// app.use('/profile-orders', userRoute);
app.use('/service-type-worker', orderWorkerRoute);
app.use('/order', orderRoute);
app.use('/profile', profileRoute);
app.use('/sub-category', subCategoryRoute);
app.use('/category', categoryRoute);
app.use('/city', cityRoute);
app.use('/', authRoute);

////////////////SOCKET//////////////////////////////////////////
const http = require('http');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ['GET', 'POST']
  }
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some(item => +item.userId === +userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = socketId => {
  users = users.filter(item => item.socketId !== socketId);
};

const findUserIdSocket = userId => {
  return users.filter(item => item.userId === userId); // [{a,b}]
};

io.on('connection', socket => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('addSocketUser', userId => {
    // console.log(userId);
    addUser(userId, socket.id);
    console.log('connectionaddUser', users);
  });

  socket.on('workerAcceptWork', data => {
    // console.log(data);
    if (findUserIdSocket(data.clientId).length !== 0) {
      io.to(findUserIdSocket(data.clientId)[0].socketId).emit('receive_workerAcceptWork');
    }
  });

  socket.on('workerCancleWork', data => {
    // console.log(data);
    if (findUserIdSocket(data.clientId).length !== 0) {
      io.to(findUserIdSocket(data.clientId)[0].socketId).emit('receive_workerCancleWork');
    }
  });

  socket.on('workerCancleSlip', data => {
    // console.log(data);
    if (findUserIdSocket(data.clientId).length !== 0) {
      io.to(findUserIdSocket(data.clientId)[0].socketId).emit('receive_workerCancleSlip');
    }
  });

  socket.on('workerAcceptSlip', data => {
    // console.log(data);
    if (findUserIdSocket(data.clientId).length !== 0) {
      io.to(findUserIdSocket(data.clientId)[0].socketId).emit('receive_workerAcceptSlip');
    }
  });

  socket.on('changeWorker', data => {
    // console.log(data);
    if (findUserIdSocket(data.workerId).length !== 0) {
      io.to(findUserIdSocket(data.workerId)[0].socketId).emit('receive_changeWorker');
    }
  });

  socket.on('clientUploadSlip', data => {
    // console.log(data);
    if (findUserIdSocket(data.workerId).length !== 0) {
      io.to(findUserIdSocket(data.workerId)[0].socketId).emit('receive_clientUploadSlip');
    }
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
    removeUser(socket.id);
    console.log('disconnectRemoneUser', users);
  });
});

//////////////////////////////////////////////////////////

app.use((req, res, next) => {
  res.status(404).json({ message: 'resource not found on this server' });
});

app.use(errorController);
const port = process.env.PORT || 8099;

server.listen(port, () => console.log(`server running on port ${port}`));
