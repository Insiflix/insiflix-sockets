import { Request, Response } from 'express';
import { createServer } from 'http';
import { Socket } from 'socket.io';

const morgan = require('morgan');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  },
  pingInterval: 10000,
  pingTimeout: 10000
});
app.use(morgan('common'));
app.use(helmet());
app.use(
  cors({
    origin: '*'
  })
);
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Insiflix Socket Server' });
});

io.on('connection', (socket: Socket) => {
  console.log('connection');
});

httpServer.listen(process.env.PORT ?? 5000, () => {
  console.log(`Server running on ${process.env.PORT ?? 5000}`);
});
