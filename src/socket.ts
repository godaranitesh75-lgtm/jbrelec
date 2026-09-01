import { io as clientIo, type Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export function initSocket() {
  if (socket) return socket;

  const configured = import.meta.env.VITE_API_BASE_URL;
  const base = configured
    ? configured.replace(/\/api$/, '')
    : 'https://jbrelec.onrender.com';

  socket = clientIo(base, {
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
