import { User } from '@hooks/data/models/types';
import { io } from 'socket.io-client';

export const joinRoom = (
  roomId: string,
  participantId: string,
  joinedRoomCallback: (data: User) => any,
) => {
  const socket = io('http://localhost:4000/lobby');

  console.log('joined');

  socket.emit('join', { roomId, participantId });

  socket.on('joinedRoom', (data) => {
    joinedRoomCallback(data);
  });
  socket.on('joined', (data) => {
    console.log('joined', data);
  });
};
