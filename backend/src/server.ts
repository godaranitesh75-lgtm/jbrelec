import dotenv from 'dotenv';
import { createServer } from 'http';
import { fileURLToPath } from 'node:url';
import { app } from './app.js';
import { initSocket } from './libs/socket.js';

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) });

const port = Number(process.env.PORT ?? 4000);
const server = createServer(app);
const io = initSocket(server);

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
});

server.listen(port, () => {
  console.log(`JBR Electrical backend running on http://localhost:${port}`);
});
