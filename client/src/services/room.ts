import { User } from '@hooks/data/models/types';
import { io } from 'socket.io-client';

export const joinRoom = (
  roomId: string,
  participantId: string,
  joinedRoomCallback: (data: User) => any,
) => {
  const socket = io('http://localhost:4000/lobby');

  console.log('joined');

  socket.emit('join_lobby', { roomId, participantId });

  socket.on('joined_lobby', (data) => {
    console.log('joined', data);
  });
};
