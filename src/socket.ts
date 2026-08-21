import { io as clientIo, type Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export function initSocket() {
  if (socket) return socket;

  socket = clientIo(import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000', {
    auth: {
      token: localStorage.getItem('jbr_token') ?? '',
    },
    transports: ['websocket'],
    autoConnect: false,
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  socket.connect();
  return socket;
}
