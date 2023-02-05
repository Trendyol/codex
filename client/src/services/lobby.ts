import { User } from '@hooks/data/models/types';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000/lobby', {
  withCredentials: true,
});

export const joinLobby = (
  lobbyId: string,
  participantId: string,
  joinedCallback: (activeParticipants: User[]) => any,
  messageCallback: (user: User, message: string) => any,
  changeStatusCallback: () => any,
) => {
  socket.emit('join_lobby', { lobbyId, participantId });

  socket.on('joined_lobby', (activeParticipants) => {
    joinedCallback(activeParticipants);
  });

  socket.on('message_lobby', ({ user, message }) => {
    messageCallback(user, message);
  });

  socket.on('change_status', () => {
    changeStatusCallback();
  });
};

export const sendMessage = (lobbyId: string, message: string) => {
  socket.emit('send_message_lobby', { lobbyId, message });
};
