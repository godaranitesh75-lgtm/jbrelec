import { io as clientIo, type Socket } from 'socket.io-client';

export let socket: Socket | null = null;

export function initSocket() {
  if (socket) return socket;

  const isLocalhost = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const base = import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL.replace(/\/api$/, '')
    : (isLocalhost ? 'http://localhost:4000' : window.location.origin);

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
