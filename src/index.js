const express = require('express');
const server = express();
const taskRouter = require('./routes/task');

//Middlewares
server.use(express.json());

//Routers
server.use('/tasks', taskRouter);

server.listen(3000, () => {
    console.log('API ONLINE');
});