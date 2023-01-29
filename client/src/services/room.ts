import { io } from 'socket.io-client';

export const joinRoom = (roomId: string, participantId: string) => {
  const socket = io('http://localhost:4000/room');

  socket.emit('join_room', { roomId });

  socket.on('joined_room', () => {});
};
