import dotenv from 'dotenv';
import { createServer } from 'http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app } from './app.js';
import { initSocket } from './libs/socket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../..', '.env');

dotenv.config({ path: envPath });

const port = Number(process.env.PORT ?? 4000);
const server = createServer(app);
const io = initSocket(server);

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
});

server.listen(port, () => {
  console.log(`JBR Electrical backend running on http://localhost:${port}`);
});
