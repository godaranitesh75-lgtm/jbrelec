import type { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { verifyJwt } from '../services/auth.js';

export let io: SocketServer | null = null;

export function initSocket(server: HttpServer) {
  io = new SocketServer(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token as string | undefined;
    if (!token) {
      return next(new Error('Authentication error'));
    }

    try {
      const payload = verifyJwt(token);
      if (!payload || typeof payload.sub !== 'string') {
        throw new Error('Invalid token');
      }
      socket.data.userId = payload.sub;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('joinOrder', (orderId: string) => {
      socket.join(`order:${orderId}`);
    });

    socket.on('joinDelivery', (deliveryId: string) => {
      socket.join(`delivery:${deliveryId}`);
    });

    socket.on('disconnect', () => {
      // noop
    });
  });

  return io;
}


