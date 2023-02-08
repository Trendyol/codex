import { User } from '@hooks/data/models/types';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/room', {
  withCredentials: true,
});

export const joinRoom = (
  roomId: string,
  messageCallback: (user: User, message: string) => void,
) => {
  socket.emit('join_room', { roomId });

  socket.on('message_room', ({ user, message }) => {
    console.log('log');
    messageCallback(user, message);
  });
};

export const sendMessage = (roomId?: string, message?: string) => {
  socket.emit('send_message_room', { roomId, message });
};
