import dotenv from 'dotenv';
import { createServer } from 'http';
import { app } from './app.js';
import { initSocket } from './libs/socket.js';

dotenv.config();

const port = Number(process.env.PORT ?? 4000);
const server = createServer(app);
const io = initSocket(server);

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
});

server.listen(port, () => {
  console.log(`JBR Electrical backend running on http://localhost:${port}`);
});
