import { User } from '@hooks/data/models/types';
import { io } from 'socket.io-client';

export const joinLobby = (
  lobbyId: string,
  participantId: string,
  joinedRoomCallback: (activeParticipants: User[]) => any,
) => {
  const socket = io('http://localhost:4000/lobby');

  socket.emit('join_lobby', { lobbyId, participantId });

  socket.on('joined_lobby', (activeParticipants) => {
    console.log(activeParticipants);
    joinedRoomCallback(activeParticipants);
  });
};
