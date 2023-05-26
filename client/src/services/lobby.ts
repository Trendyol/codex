import { User } from '@hooks/data/models/types';
import { io } from 'socket.io-client';
import {getConfigWithTypes} from "@contexts/ConfigContext";

const configs = getConfigWithTypes();

const socket = io(`${configs.baseUrl}/lobby`, {
  withCredentials: true,
  transports: ['websocket'],
});

export const joinLobby = (
  lobbyId: string,
  participantId: string,
  joinedCallback: (activeParticipants: User[]) => any,
  messageCallback: (user: User, message: string) => any,
  changeStatusCallback: () => any,
) => {
  socket.connect();

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

export const sendMessage = (user: User, lobbyId?: string, message?: string) => {
  socket.emit('send_message_lobby', { user, lobbyId, message });
};

export const disconnectSocket = () => {
  socket.disconnect();
};
